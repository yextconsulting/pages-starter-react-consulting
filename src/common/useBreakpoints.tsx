import { useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { getRuntime } from "@yext/pages/util";
import { screens as defaultScreens } from "tailwindcss/defaultTheme";
import tailwindConfig from "../../tailwind.config";
import type { KeyValuePair } from "tailwindcss/types/config.js";

const fullConfig = resolveConfig(tailwindConfig);

// TODO: get rid of this type cast. The possible types for screens are very flexible, which makes this complicated
const screens: KeyValuePair<string, string> = (fullConfig.theme?.screens ||
  defaultScreens) as KeyValuePair<string, string>;

const runtime = getRuntime();
// TODO(bhaines): move to isServerSide helper when that's released in future pagesJS version
const useIsomorphicEffect =
  runtime.name === "node" || runtime.name === "deno"
    ? useEffect
    : useLayoutEffect;

export function useBreakpoint(
  // TODO: this should be `keyof typeof screens`, but because types don't exist for the imported file that breaks
  // autocomplete. This is ok as a workaround because while people might tweak the values for the different breakpoints,
  // they're not likely to change the set of available breakpoints
  breakpoint: keyof typeof defaultScreens,
  defaultValue = false
) {
  const [match, setMatch] = useState(defaultValue);

  useIsomorphicEffect(() => {
    if (!(runtime.name === "browser" && "matchMedia" in window))
      return undefined;

    const value = screens[breakpoint];
    const query = window.matchMedia(`(min-width: ${value})`);
    const handler = () => {
      if (query.matches !== match) {
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
