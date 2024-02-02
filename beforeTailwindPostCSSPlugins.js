// See comment in postcss.config.js for explanation of why
// this file is necessary.

import postcss from "postcss";
import postCssMixins from "postcss-mixins";

export const beforeTailwindPostCSSPlugins = {
  postcssPlugin: "yext-grouped",
  Once(root, { result }) {
    return postcss([postCssMixins]).process(root, result.opts);
  },
};
