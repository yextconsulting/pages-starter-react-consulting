import { codes } from "micromark-util-symbol/codes.js";
import { Extension, Construct } from "micromark-util-types";
import { resolveAllSuperscript } from "./resolver";
import { tokenizeSuperscript } from "./tokenizer";

/**
 * A micromark syntax extension to support superscript.
 */
export function yextSuperscript(): Extension {
  const tokenizer: Construct = {
    tokenize: tokenizeSuperscript,
    resolveAll: resolveAllSuperscript,
  };

  return {
    text: { [codes.caret]: tokenizer },
    insideSpan: { null: [tokenizer] },
  };
}
