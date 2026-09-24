import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Playwright owns e2e; Vitest must not try to run those specs.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      // Excluded from coverage because they contain no branching logic to assert.
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/layout.tsx',
        'src/types/**',
        'src/lib/dummy-data.ts',
      ],
      // No global threshold yet — ALZ-157 sets the floor from a measured
      // baseline once there is enough coverage for a gate to be meaningful
      // rather than obstructive. Reporting first, gating second.
    },
  },
});
