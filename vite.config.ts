import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build' && mode === 'production';
  
  return {
    plugins: [react()],
    base: isProduction ? '/Mom-baby-shop/' : '/',
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  };
});