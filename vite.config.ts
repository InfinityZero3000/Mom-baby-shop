import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: '/Mom-baby-shop/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});