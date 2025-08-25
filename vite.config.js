import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/Components'),
    },
  },
  server: {
    host: "143.198.238.107",
    port: "3001",
    //  host: "10.10.20.31",
    //  port: "3001",
  },
});
