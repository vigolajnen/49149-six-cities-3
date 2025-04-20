/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    envPrefix: 'REACT_APP_',
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  };

})

