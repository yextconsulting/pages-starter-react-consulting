import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import * as path from "path";

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  plugins: [react(), yextSSG()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          yext: [
            "@yext/custom-field-debugger",
            "@yext/pages",
            "@yext/schema-wrapper",
            "@yext/types",
            "@yext/sites-react-components",
          ],
          yextSearch: ["@yext/search-headless-react", "@yext/search-ui-react"],
        },
      },
    },
  },
  ssr: {
    noExternal: ["@yext/search-headless-react", "@yext/search-ui-react"],
  },
});
