/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      include: ['src/**/*'],
      exclude: [
        '**/*/@(index|config).@(tsx|ts)',
        '**/*/*.@(icon|asset|d|test).@(tsx|ts)',
      ],
      enabled: true,
      provider: 'c8',
      reporter: ['text'],
      all: true,
    },
  },
});
