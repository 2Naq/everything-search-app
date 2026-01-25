import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const everythingUrl = env.VITE_EVERYTHING_URL || "http://localhost:8090";

  // Helper to validate IPv4 address
  const isValidIPv4 = (hostname) => {
    const parts = hostname.split(".");
    if (parts.length !== 4) return true; // Not an IPv4 format, pass through
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
    });
  };

  const proxyConfig = {
    "/api": {
      target: everythingUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
      router: (req) => {
        // Check for dynamic target header
        const dynamicTarget = req.headers["x-everything-server-url"];
        console.log(
          "[Vite Proxy] Request received, X-Everything-Server-Url:",
          dynamicTarget || "(not set)",
        );
        if (dynamicTarget) {
          try {
            const url = new URL(dynamicTarget);
            // Validate port
            if (url.port && parseInt(url.port) > 65535) {
              throw new Error("Invalid port");
            }
            // Validate IPv4 octets if hostname looks like an IP
            if (!isValidIPv4(url.hostname)) {
              throw new Error("Invalid IPv4 address");
            }
            console.log(
              "[Vite Proxy] Valid target, routing to:",
              dynamicTarget,
            );
            return dynamicTarget;
          } catch (err) {
            console.error(
              "[Vite Proxy] Invalid dynamic target:",
              err.message,
              "- Routing to 0.0.0.0:0",
            );
            return "http://0.0.0.0:0"; // Force connection error
          }
        }
        console.log(
          "[Vite Proxy] No custom header, using default:",
          everythingUrl,
        );
        return everythingUrl;
      },
      configure: (proxy, _options) => {
        proxy.on("proxyReq", (proxyReq, req, res) => {
          if (req.headers.authorization) {
            proxyReq.setHeader("Authorization", req.headers.authorization);
          }

          // Check for dynamic target header and validate BEFORE sending
          const dynamicTarget = req.headers["x-everything-server-url"];
          if (dynamicTarget) {
            try {
              const url = new URL(dynamicTarget);
              // Validate port
              if (url.port && parseInt(url.port) > 65535) {
                throw new Error("Invalid port");
              }
              // Validate IPv4 octets if hostname looks like an IP
              if (!isValidIPv4(url.hostname)) {
                throw new Error("Invalid IPv4 address");
              }
              // URL is valid - log and continue
              console.log("[Vite Proxy] Valid target:", dynamicTarget);
            } catch (err) {
              console.error(
                "[Vite Proxy] Invalid target:",
                dynamicTarget,
                "-",
                err.message,
              );
              // Abort the current proxy request
              proxyReq.destroy();
              // Respond with 502 error
              if (!res.headersSent) {
                res.writeHead(502, { "Content-Type": "text/plain" });
                res.end("Proxy Error: Invalid target URL");
              }
              return;
            }
          }

          // Remove the custom header before sending upstream
          proxyReq.removeHeader("x-everything-server-url");
        });
        proxy.on("proxyRes", (proxyRes, req, res) => {
          // Remover WWW-Authenticate header to prevent browser native auth popup
          if (proxyRes.headers["www-authenticate"]) {
            delete proxyRes.headers["www-authenticate"];
          }
        });
        proxy.on("error", (err, req, res) => {
          console.error("[Vite Proxy] Error:", err.message);
          if (!res.headersSent) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Proxy Error");
          }
        });
      },
    },
  };

  return {
    plugins: [
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
      proxy: proxyConfig, // Use Shared Proxy Config
    },
    // Preview config (npm run preview)
    preview: {
      port: 5173,
      strictPort: true,
      proxy: proxyConfig, // Enable Proxy for Preview too!
    },
  };
});
