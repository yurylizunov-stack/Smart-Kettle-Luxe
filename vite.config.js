import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    apply: 'build',
    async closeBundle() {
      const source = resolve('assets');
      const destination = resolve('dist/assets');

      await rm(resolve(destination, 'fonts'), { recursive: true, force: true });
      await rm(resolve(destination, 'images'), { recursive: true, force: true });
      await rm(resolve(destination, 'sequences'), { recursive: true, force: true });
      await rm(resolve(destination, 'videos'), { recursive: true, force: true });
      await cp(source, destination, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticAssets()],
});
