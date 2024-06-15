import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
console.log('Loaded vitest config');

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.js'
  }
});