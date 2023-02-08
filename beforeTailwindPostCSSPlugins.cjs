// See comment in postcss.config.cjs for explanation of why
// this file is necessary.

const postcss = require("postcss");

module.exports = {
  postcssPlugin: "yext-grouped",
  Once(root, { result }) {
    return postcss([require("postcss-mixins")]).process(root, result.opts);
  },
};
