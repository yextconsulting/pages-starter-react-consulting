import { all } from "remark-rehype";
import { Handler } from "mdast-util-to-hast";

/**
 * A handler for converting emphasis MDAST nodes to HAST nodes
 * with the `i` tag, instead of the default `em` tag.
 */
export const emphasisHandler: Handler = (h, node) => {
  return h(node, "i", all(h, node));
};

/**
 * A handler for converting strong MDAST nodes to HAST nodes
 * with the `b` tag, instead of the default `strong` tag.
 */
export const strongHandler: Handler = (h, node) => {
  return h(node, "b", all(h, node));
};

/**
 * A handler for converting underline MDAST nodes to HAST nodes.
 */
export const underlineHandler: Handler = (h, node) => {
  return h(node, "u", all(h, node));
};

/**
 * A handler for converting strikethrough MDAST nodes to HAST nodes.
 */
export const strikethroughHandler: Handler = (h, node) => {
  return h(node, "s", all(h, node));
};

/**
 * A handler for converting subscript MDAST nodes to HAST nodes.
 */
export const subscriptHandler: Handler = (h, node) => {
  return h(node, "sub", all(h, node));
};

/**
 * A handler for converting superscript MDAST nodes to HAST nodes.
 */
export const superscriptHandler: Handler = (h, node) => {
  return h(node, "sup", all(h, node));
};
