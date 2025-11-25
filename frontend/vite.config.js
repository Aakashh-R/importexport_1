import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/importexport_1",
  server: {
    port: 5173,
    host: "localhost",
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:5001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "axios"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
