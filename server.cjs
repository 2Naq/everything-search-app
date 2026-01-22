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
  target: EVERYTHING_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove /api prefix
  },
  onProxyReq: (proxyReq, req) => {
    // Forward Authorization header if present
    if (req.headers.authorization) {
      proxyReq.setHeader("Authorization", req.headers.authorization);
    }
  },
  onProxyRes: (proxyRes) => {
    // Remove WWW-Authenticate header to prevent browser native auth popup
    if (proxyRes.headers["www-authenticate"]) {
      delete proxyRes.headers["www-authenticate"];
    }
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
