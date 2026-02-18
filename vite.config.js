import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Copies dist/index.html → dist/404.html after build so GitHub Pages
// falls back to the SPA shell for all client-side routes.
function copyIndexAs404() {
  return {
    name: 'copy-index-as-404',
    closeBundle() {
      const src = path.resolve(__dirname, 'dist/index.html');
      const dest = path.resolve(__dirname, 'dist/404.html');
      if (fs.existsSync(src)) fs.copyFileSync(src, dest);
    },
  };
}

export default defineConfig({
  plugins: [react(), copyIndexAs404()],
});
