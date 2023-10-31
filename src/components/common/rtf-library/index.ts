import { yextSyntax } from "./micromark-extension-yext";
import { Processor } from "unified";
import { Root } from "mdast";
import { yextFromMarkdown } from "./mdast-util-yext";
import { ok as assert } from "uvu/assert";
import {
  emphasisHandler,
  strikethroughHandler,
  strongHandler,
  subscriptHandler,
  superscriptHandler,
  underlineHandler,
} from "./handlers";

/**
 * Remark plugin to support Yext Markdown (underline, subscript, superscript,
 * and strikethrough).
 */
export default function remarkYext(this: Processor<void, Root>) {
  const data = this.data();

  add("micromarkExtensions", yextSyntax());
  add("fromMarkdownExtensions", yextFromMarkdown());

  function add(field: string, value: unknown) {
    const fieldData = data[field];
    if (fieldData) {
      assert(Array.isArray(fieldData));
      fieldData.push(value);
    } else {
      data[field] = [value];
    }
  }
}

/**
 * Handlers for converting Yext Markdown-specific MDAST nodes to HAST nodes.
 * For use with remark-rehype (passed as options.handlers).
 */
export const yextRemarkRehypeHandlers = {
  emphasis: emphasisHandler,
  strong: strongHandler,
  underline: underlineHandler,
  strikethrough: strikethroughHandler,
  subscript: subscriptHandler,
  superscript: superscriptHandler,
};
