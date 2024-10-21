import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    reporters: ['verbose'],
    environmentMatchGlobs: [
      [
        'src/shared/http/controllers/**',
        'src/shared/core/libs/prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
    dir: 'src',
    coverage: {
      include: ['src/app/use-cases/**/*.ts'],
    },
  },
})
