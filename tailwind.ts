import { CSSProperties } from "react";

export type ComponentDefinitions = Record<
  string,
  | CSSProperties
  | { "&:hover": CSSProperties }
  | { "&:focus": CSSProperties }
  | { "&:active": CSSProperties }
>;

export type ButtonConfig = CSSProperties & {
  variants: Record<
    string,
    | CSSProperties
    | { "&:hover": CSSProperties }
    | { "&:focus": CSSProperties }
    | { "&:active": CSSProperties }
  >;
};

export type HeadingConfig = CSSProperties & {
  variants: Record<
    string,
    CSSProperties | { [key in ScreenSizeQuerys]: CSSProperties }
  >;
};

export type LinkConfig = CSSProperties & {
  variants: Record<
    string,
    | CSSProperties
    | { "&:hover": CSSProperties }
    | { "&:focus": CSSProperties }
    | { "&:active": CSSProperties }
  >;
};

type ScreenSizeQuerys =
  | "@screen sm"
  | "@screen md"
  | "@screen lg"
  | "@screen xl"
  | "@screen 2xl";
