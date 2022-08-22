import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve('src/')
    }
  },
  plugins: [
    viteCommonjs(), // this plugin is needed so that we can import tailwind.config.cjs
    react(),
    yextSSG()],
  optimizeDeps: {
    include: ['@yext/components-tsx-maps', '@yext/components-tsx-geo'],
  },
});
