import { CompileContext, Extension, Token } from "mdast-util-from-markdown";
import { Strikethrough } from "./mdast-node-types";

/**
 * A fromMarkdown mdast extension to support strikethrough.
 */
export const strikethroughFromMarkdown: Extension = {
  canContainEols: ["strikethrough"],
  enter: { strikethrough: enterStrikethrough },
  exit: { strikethrough: exitStrikethrough },
};

/**
 * Handles entering a strikethrough event by entering the token and
 * adding a Strikethrough mdast node to the tree.
 */
function enterStrikethrough(this: CompileContext, token: Token) {
  this.enter<Strikethrough>({ type: "strikethrough", children: [] }, token);
}

/**
 * Handles exiting a strikethrough event by exiting the token.
 */
function exitStrikethrough(this: CompileContext, token: Token) {
  this.exit(token);
}
