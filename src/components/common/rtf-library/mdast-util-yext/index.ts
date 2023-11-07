import { Extension } from "mdast-util-from-markdown";
import { strikethroughFromMarkdown } from "./strikethrough";
import { subscriptFromMarkdown } from "./subscript";
import { superscriptFromMarkdown } from "./superscript";
import { underlineFromMarkdown } from "./underline";

/**
 * A function that returns the fromMarkdown mdast extensions to support Yext Markdown.
 */
export function yextFromMarkdown(): Extension[] {
  return [
    underlineFromMarkdown,
    strikethroughFromMarkdown,
    subscriptFromMarkdown,
    superscriptFromMarkdown,
  ];
}
