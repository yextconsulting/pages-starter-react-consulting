import { CompileContext, Extension, Token } from "mdast-util-from-markdown";
import { Underline } from "./mdast-node-types";

/**
 * A fromMarkdown mdast extension to support underline.
 */
export const underlineFromMarkdown: Extension = {
  canContainEols: ["underline"],
  enter: { underline: enterUnderline },
  exit: { underline: exitUnderline },
};

/**
 * Handles entering an underline event by entering the token and
 * adding an Underline mdast node to the tree.
 */
function enterUnderline(this: CompileContext, token: Token) {
  this.enter<Underline>({ type: "underline", children: [] }, token);
}

/**
 * Handles exiting an underline event by exiting the token.
 */
function exitUnderline(this: CompileContext, token: Token) {
  this.exit(token);
}
