import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
      ...(isDev && {
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false,
          },
          '/auth': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },
  };
});
