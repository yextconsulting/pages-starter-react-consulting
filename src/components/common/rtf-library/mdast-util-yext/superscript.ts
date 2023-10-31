import { CompileContext, Extension, Token } from "mdast-util-from-markdown";
import { Superscript } from "./mdast-node-types";

/**
 * A fromMarkdown mdast extension to support superscript.
 */
export const superscriptFromMarkdown: Extension = {
  canContainEols: ["superscript"],
  enter: { superscript: enterSuperscript },
  exit: { superscript: exitSuperscript },
};

/**
 * Handles entering a superscript event by entering the token and
 * adding a Superscript mdast node to the tree.
 */
function enterSuperscript(this: CompileContext, token: Token) {
  this.enter<Superscript>({ type: "superscript", children: [] }, token);
}

/**
 * Handles exiting a superscript event by exiting the token.
 */
function exitSuperscript(this: CompileContext, token: Token) {
  this.exit(token);
}
