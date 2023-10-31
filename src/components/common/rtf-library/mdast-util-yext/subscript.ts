import { CompileContext, Extension, Token } from "mdast-util-from-markdown";
import { Subscript } from "./mdast-node-types";

/**
 * A fromMarkdown mdast extension to support subscript.
 */
export const subscriptFromMarkdown: Extension = {
  canContainEols: ["subscript"],
  enter: { subscript: enterSubscript },
  exit: { subscript: exitSubscript },
};

/**
 * Handles entering a subscript event by entering the token and
 * adding a Subscript mdast node to the tree.
 */
function enterSubscript(this: CompileContext, token: Token) {
  this.enter<Subscript>({ type: "subscript", children: [] }, token);
}

/**
 * Handles exiting a subscript event by exiting the token.
 */
function exitSubscript(this: CompileContext, token: Token) {
  this.exit(token);
}
