import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const everythingUrl = env.VITE_EVERYTHING_URL || "http://localhost:8090";

  const proxyConfig = {
    "/api": {
      target: everythingUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
      configure: (proxy, _options) => {
        proxy.on("proxyReq", (proxyReq, req) => {
          if (req.headers.authorization) {
            proxyReq.setHeader("Authorization", req.headers.authorization);
          }
        });
        // proxy.on("proxyRes", (proxyRes, req, res) => {
        //   // Remover WWW-Authenticate header to prevent browser native auth popup
        //   if (proxyRes.headers["www-authenticate"]) {
        //     delete proxyRes.headers["www-authenticate"];
        //   }
        // });
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
