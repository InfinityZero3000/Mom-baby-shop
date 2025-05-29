import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // Check if building for production (GitHub Pages)
  const isGitHubBuild = process.env.NODE_ENV === 'production' || mode === 'production';
  
  return {
    plugins: [react()],
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  };
});