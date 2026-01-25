import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import http from "http";
import https from "https";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const defaultEverythingUrl =
    env.VITE_EVERYTHING_URL || "http://localhost:8090";

  // Helper to validate IPv4 address
  const isValidIPv4 = (hostname) => {
    const parts = hostname.split(".");
    if (parts.length !== 4) return true; // Not an IPv4 format, pass through
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
    });
  };

  // Validate target URL
  const validateTargetUrl = (urlString) => {
    try {
      const url = new URL(urlString);
      if (url.port && parseInt(url.port) > 65535) {
        return { valid: false, error: "Invalid port" };
      }
      if (!isValidIPv4(url.hostname)) {
        return { valid: false, error: "Invalid IPv4 address" };
      }
      return { valid: true, url };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  };

  // Custom middleware plugin for dynamic proxy
  const dynamicProxyPlugin = () => ({
    name: "dynamic-proxy",
    configureServer(server) {
      server.middlewares.use("/api", (req, res, next) => {
        // Get dynamic target from header
        const dynamicTarget = req.headers["x-everything-server-url"];
        const targetUrl = dynamicTarget || defaultEverythingUrl;

        console.log("[Dynamic Proxy] Request to /api, target:", targetUrl);

        // Validate target URL
        const validation = validateTargetUrl(targetUrl);
        if (!validation.valid) {
          console.error("[Dynamic Proxy] Invalid target:", validation.error);
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end(`Proxy Error: ${validation.error}`);
          return;
        }

        const parsedTarget = validation.url;
        const isHttps = parsedTarget.protocol === "https:";
        const httpModule = isHttps ? https : http;

        // Build the target path (remove /api prefix)
        const targetPath = req.url; // Already has /api removed by middleware path

        const options = {
          hostname: parsedTarget.hostname,
          port: parsedTarget.port || (isHttps ? 443 : 80),
          path: targetPath,
          method: req.method,
          headers: {
            ...req.headers,
            host: parsedTarget.host,
          },
          timeout: 30000, // 10 second timeout
        };

        // Remove our custom header
        delete options.headers["x-everything-server-url"];

        const proxyReq = httpModule.request(options, (proxyRes) => {
          // Remove WWW-Authenticate header to prevent browser auth popup
          const headers = { ...proxyRes.headers };
          delete headers["www-authenticate"];

          res.writeHead(proxyRes.statusCode || 500, headers);
          proxyRes.pipe(res);
        });

        proxyReq.on("error", (err) => {
          console.error("[Dynamic Proxy] Error:", err.message);
          if (!res.headersSent) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Proxy Error: " + err.message);
          }
        });

        proxyReq.on("timeout", () => {
          console.error("[Dynamic Proxy] Timeout");
          proxyReq.destroy();
          if (!res.headersSent) {
            res.writeHead(504, { "Content-Type": "text/plain" });
            res.end("Proxy Error: Connection timeout");
          }
        });

        // Pipe request body
        req.pipe(proxyReq);
      });
    },
  });

  return {
    plugins: [
      dynamicProxyPlugin(), // Custom proxy must be FIRST
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Server config (Dev)
    server: {
      port: 5173,
      strictPort: true,
    },
    // Preview config (npm run preview)
    preview: {
      port: 5173,
      strictPort: true,
    },
  };
});
