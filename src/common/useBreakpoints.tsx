import { useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import resolveConfig from 'tailwindcss/resolveConfig'
import { screens as defaultScreens } from "tailwindcss/defaultTheme"
//@ts-ignore: figure out how to use Tailwind's provided config type for this
import * as tailwindConfig from '../../tailwind.config.cjs';
import { KeyValuePair } from "tailwindcss/types/config.js";

const fullConfig = resolveConfig(tailwindConfig);
// TODO: get rid of this type cast. The possible types for screens are very flexible, which makes this complicated
const screens: KeyValuePair<string, string> = (fullConfig.theme?.screens || defaultScreens) as KeyValuePair<string, string>;

// https://github.com/pmndrs/zustand/blob/833f57ed131e94f3ed48627d4cfbf09cb9c7df03/src/react.ts#L20-L23
export const isSSR = typeof window === "undefined" || !globalThis.navigator
export const isBrowser = !isSSR;
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;

export function useBreakpoint(
  // TODO: this should be `keyof typeof screens`, but because types don't exist for the imported file that breaks
  // autocomplete. This is ok as a workaround because while people might tweak the values for the different breakpoints,
  // they're not likely to change the set of available breakpoints
  breakpoint: keyof typeof defaultScreens,
  defaultValue = false
) {
  const [match, setMatch] = useState(defaultValue);

  useIsomorphicEffect(() => {
    if (!(isBrowser && "matchMedia" in window)) return undefined;

    const value = screens[breakpoint];
    const query = window.matchMedia(`(min-width: ${value})`);
    const handler = () => {
      if (query.matches != match) {
        setMatch(query.matches);
      }
    };

    handler();
    query.addEventListener("change", handler);
    return () => {
      query.removeEventListener("change", handler);
    };
  });

  return match;
}