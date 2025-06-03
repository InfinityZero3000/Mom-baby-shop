import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Check if building for production (GitHub Pages)
  const isProduction = process.env.NODE_ENV === 'production' || mode === 'production';
  const isGitHubBuild = process.env.GITHUB_PAGES === 'true' || process.env.BUILD_FOR_GITHUB === 'true';
  
  return {
    plugins: [react()],
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    build: {
      outDir: 'dist',
      sourcemap: isProduction ? false : true,
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
    publicDir: 'images',
    server: {
      fs: {
        allow: ['..'],
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_FOR_GITHUB': JSON.stringify(process.env.BUILD_FOR_GITHUB),
    },
    css: {
      postcss: './postcss.config.js',
    },
  };
});