import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/finfolio2/',
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist',
  },
  server: {
    allowedHosts: true,
  },
});
