const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Everything HTTP Server URL
const EVERYTHING_URL = process.env.VITE_EVERYTHING_URL || "http://localhost:80";

console.log(`Starting server on port ${PORT}`);
console.log(`Proxy target: ${EVERYTHING_URL}`);

// Proxy configuration for /api requests
const apiProxy = createProxyMiddleware({
  target: EVERYTHING_URL, // Default target
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove /api prefix
  },
  router: (req) => {
    // Check for dynamic target header
    const dynamicTarget = req.headers["x-everything-server-url"];
    if (dynamicTarget) {
      try {
        const url = new URL(dynamicTarget);
        if (url.port && parseInt(url.port) > 65535) {
          throw new Error("Invalid port");
        }
        // Validate IPv4 octets if hostname looks like an IP
        const ipParts = url.hostname.split(".");
        if (ipParts.length === 4 && ipParts.every((p) => /^\d+$/.test(p))) {
          const isValidIP = ipParts.every((p) => parseInt(p) <= 255);
          if (!isValidIP) {
            throw new Error("Invalid IPv4 address");
          }
        }
        // console.log(`Dynamic proxy target: ${dynamicTarget}`);
        return dynamicTarget;
      } catch (err) {
        console.error("Invalid dynamic target:", err.message);
        // Return a definitely unreachable target to force error,
        // effectively disabling fallback to default target
        return "http://0.0.0.0:0";
      }
    }
    return EVERYTHING_URL;
  },
  onProxyReq: (proxyReq, req) => {
    // Forward Authorization header if present
    if (req.headers.authorization) {
      proxyReq.setHeader("Authorization", req.headers.authorization);
    }

    // Remove the custom header before sending to upstream to avoid confusion
    proxyReq.removeHeader("x-everything-server-url");
  },
  onProxyRes: (proxyRes) => {
    // console.log("Proxy response status:", proxyRes.statusCode);
    // console.log("Proxy response headers:", proxyRes.headers);

    // Remove WWW-Authenticate header to prevent browser native auth popup
    // Headers are typically lowercased by Node.js/Express, but we check safely
    const authHeaderKey = Object.keys(proxyRes.headers).find(
      (key) => key.toLowerCase() === "www-authenticate",
    );

    if (authHeaderKey) {
      delete proxyRes.headers[authHeaderKey];
      delete proxyRes.headers[authHeaderKey];
      // console.log("Removed WWW-Authenticate header");
    }
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(502).send("Proxy Error");
  },
});

// Use proxy for /api requests
app.use("/api", apiProxy);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA routing - return index.html for all non-API requests
// Use regex pattern for Express 5 compatibility (path-to-regexp v8)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
