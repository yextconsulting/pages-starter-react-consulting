import React, { createContext, useContext } from "react";
import { Image, Coordinate, Address, Hours, CTA } from "@yext/types";

export type Card<P> = (props: { profile: P }) => React.Element | null;

interface Hero {
  name?: string;
  background?: Image;
  cTA1?: CTA;
  cTA2?: CTA;
}

export interface FAQ {
  name: string;
  // TODO(bhaines): how to handle rich text type
  answer?: string;
}

export interface Profile {
  id: string;
  name: string;
  description?: string;
  logo?: Image;
  address: Address;
  openTime?: string;
  hours?: Hours;
  mainPhone?: string;
  geocodedCoordinate: Coordinate;
  services?: string[];
  photoGallery?: Image[];
  c_alertBanner?: string;
  c_hero?: Hero;
  slug?: string;
  c_faqs?: FAQ[];
  c_faqImage?: Image;
  _site: any;
}

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
export function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error(
        "Attempted to call useProfile outside of ProfileProvider"
      );
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

// We still have to specify a type, but no default
const [useProfileContext, ProfileProvider] = createCtx<Record<string,unknown>>();

function useProfile<T>(fieldSelector: (p: Record<string,unknown>) => T): T {
  const context = useProfileContext();
  return fieldSelector(context);
}

export { useProfile, ProfileProvider };