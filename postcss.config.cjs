module.exports = {
  plugins: {
    // We need certain plugins to run before Tailwind,
    // however the order of the plugins in this file doesn't completely determine
    // the order of execution. Some plugins that use the "visitor" API always run after
    // plugins that don't.
    // Using this separate file lets us get around this.
    // See this GH comment for more details: https://github.com/tailwindlabs/tailwindcss/issues/4114#issuecomment-1124214290
    "./beforeTailwindPostCSSPlugins.cjs": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
