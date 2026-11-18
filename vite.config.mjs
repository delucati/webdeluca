import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        filosofia: resolve(__dirname, 'filosofia.html'),
        gracias: resolve(__dirname, 'gracias.html'),
        unete: resolve(__dirname, 'unete.html'),
      },
    },
  },
});