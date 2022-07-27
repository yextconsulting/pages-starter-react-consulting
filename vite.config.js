import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve('src/')
    }
  },
  plugins: [react(), yextSSG()],
});
