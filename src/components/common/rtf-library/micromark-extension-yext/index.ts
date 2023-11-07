import { combineExtensions } from "micromark-util-combine-extensions";
import { yextStrikethroughSubscript } from "./strikethrough-subscript";
import { yextSuperscript } from "./superscript";
import { yextUnderline } from "./underline";

/**
 * A function that returns a micromark syntax extension to support Yext Markdown.
 */
export function yextSyntax() {
  return combineExtensions([
    yextUnderline(),
    yextSuperscript(),
    yextStrikethroughSubscript(),
  ]);
}
