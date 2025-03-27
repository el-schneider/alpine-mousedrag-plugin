import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AlpineMouseDragPlugin',
      fileName: (format) =>
        `alpine-mousedrag-plugin.${format === 'es' ? 'js' : format}`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['alpinejs'],
      output: {
        globals: {
          alpinejs: 'Alpine',
        },
      },
    },
    minify: true,
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      rollupTypes: true,
    }),
  ],
});
