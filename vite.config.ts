/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@store': path.resolve(__dirname, './src/store/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@enums': path.resolve(__dirname, './src/enums/'),
      '@layouts': path.resolve(__dirname, './src/layouts/'),
      '@services': path.resolve(__dirname, './src/services/'),
    },
  },
});

