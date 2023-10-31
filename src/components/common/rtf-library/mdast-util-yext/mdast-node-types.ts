import { Parent, PhrasingContent } from "mdast";

export interface Underline extends Parent {
  type: "underline";
  children: PhrasingContent[];
}

export interface Strikethrough extends Parent {
  type: "strikethrough";
  children: PhrasingContent[];
}

export interface Subscript extends Parent {
  type: "subscript";
  children: PhrasingContent[];
}

export interface Superscript extends Parent {
  type: "superscript";
  children: PhrasingContent[];
}

declare module "mdast" {
  interface StaticPhrasingContentMap {
    underline: Underline;
    strikethrough: Strikethrough;
    subscript: Subscript;
    superscript: Superscript;
  }
}
