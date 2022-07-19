import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/vite-plugin-yext-sites-ssg";
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve('src/')
    }
  },
  plugins: [react(), yextSSG()],
});
