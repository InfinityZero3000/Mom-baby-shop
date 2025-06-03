import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Check if building for production (GitHub Pages)
  const isGitHubBuild = process.env.NODE_ENV === 'production' || mode === 'production';
  
  return {
    plugins: [react()],
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    build: {
      outDir: 'dist',
      sourcemap: false,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    publicDir: 'public', // Use standard public directory
    server: {
      fs: {
        allow: ['..'],
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
  };
});