import React from 'react';
import plugin from 'tailwindcss/plugin';
import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';

export type ComponentDefinitions = Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>;

export function styleguidePlugin(genFunc: (api: PluginAPI) => ComponentDefinitions) {
  return plugin((pluginAPI) => {
    pluginAPI.addComponents(genFunc(pluginAPI) as CSSRuleObject);
  })
}