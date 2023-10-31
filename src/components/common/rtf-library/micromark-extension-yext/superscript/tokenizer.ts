// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck inlined library code

import { ok as assert } from "uvu/assert";
import { codes } from "micromark-util-symbol/codes.js";
import { Effects, State, TokenizeContext, Code } from "micromark-util-types";

/**
 * Sets up a state machine to handle a stream of character codes
 * that begins with a caret.
 */
export function tokenizeSuperscript(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return start;

  function start(code: Code): State | void {
    assert(code === codes.caret, "expected `^`");
    effects.enter("superscriptSequenceTemporary");
    return sequence(code);
  }

  function sequence(code: Code): State | void {
    if (code === codes.caret) {
      effects.consume(code);
      return sequence;
    }

    const token = effects.exit("superscriptSequenceTemporary");

    // Unlike other syntax (bold, underline, subscript, etc.), superscript
    // allows any token to open or close regardless of surrounding characters
    // in order to match the logic KM has through flexmark-java.
    token._open = true;
    token._close = true;

    return ok(code);
  }
}
