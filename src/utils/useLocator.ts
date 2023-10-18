import { Result } from "@yext/search-headless-react";
import { createCtx } from "src/common/createCtx";
import { LocationProfile } from "src/types/entities";

type LocatorContextType = {
  results: Result<LocationProfile>[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  focusedId: string;
  setFocusedId: (id: string) => void;
  hoveredId: string;
  setHoveredId: (id: string) => void;
};

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [useLocator, LocatorProvider] = createCtx<LocatorContextType>(
  "Attempted to call useLocator outside of LocatorProvider"
);
