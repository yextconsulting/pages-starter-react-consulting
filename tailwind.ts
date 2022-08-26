import React from 'react';
import plugin from 'tailwindcss/plugin';

export type ComponentDefinitions = Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>;

export type ButtonConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>}

export function styleguidePlugin() {
  return plugin(({addComponents, theme}) => {
    const components = Object.assign({}, {'.Button': theme('buttons') || {}});
    delete components['.Button'].variants;

    for (const [variant, styles] of Object.entries(theme('buttons.variants'))) {
      components[`.Button--${variant}`] = styles;

    }

    addComponents(components);
  })
}