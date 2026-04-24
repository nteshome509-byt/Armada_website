import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        capabilities: resolve(__dirname, "capabilities/index.html"),
        approach: resolve(__dirname, "approach/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
      },
    },
  },
});
