const plugin = require('tailwindcss/plugin');

module.exports = function styleguidePlugin() {
  return plugin(({addComponents, theme}) => {
    const components = Object.assign({}, {'.Button': JSON.parse(JSON.stringify(theme('buttons') || {}))});
    delete components['.Button'].variants;

    for (const [variant, styles] of Object.entries(theme('buttons.variants'))) {
      components[`.Button--${variant}`] = styles;
    }

    addComponents(components);
  })
}