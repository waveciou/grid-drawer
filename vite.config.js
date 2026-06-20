import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const projectName = "grid-drawer";

export default defineConfig({
  root,
  base: "./",
  build: {
    outDir,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(root, "example.html"),
      output: {
        entryFileNames: `js/${projectName}.js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: ({ name = "" }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name)) {
            return "img/[name].[ext]";
          }
          if (/\.css$/.test(name)) {
            return `css/${projectName}.[ext]`;
          }
          return "[name].[ext]";
        },
      },
    },
  },
});
