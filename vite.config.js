import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const projectName = 'grid-drawer';

export default defineConfig({
  root,
  build: {
    outDir,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `${projectName}.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: ({ name = '' }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name)){
            return `${projectName}.[ext]`;
          }
          if (/\.css$/.test(name)) {
            return `${projectName}.[ext]`;
          }
          return `[name].[ext]`;
        }
      }
    },
  }
});