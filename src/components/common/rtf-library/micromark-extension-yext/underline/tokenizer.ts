// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck inlined library code

import { ok as assert } from "uvu/assert";
import { classifyCharacter } from "micromark-util-classify-character";
import { codes } from "micromark-util-symbol/codes.js";
import { constants } from "micromark-util-symbol/constants.js";
import { Effects, State, TokenizeContext, Code } from "micromark-util-types";

/**
 * Sets up a state machine to handle a stream of character codes
 * that begins with a plus sign.
 */
export function tokenizeUnderline(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  const previous = this.previous;
  const before = classifyCharacter(previous);
  let size = 0;

  return start;

  function start(code: Code): State | void {
    assert(code === codes.plusSign, "expected `+`");
    effects.enter("underlineSequenceTemporary");
    return sequence(code);
  }

  function sequence(code: Code): State | void {
    if (code === codes.plusSign) {
      effects.consume(code);
      size++;
      return sequence;
    }

    // If there is only one marker, exit.
    if (size < 2) {
      return nok(code);
    }
    const token = effects.exit("underlineSequenceTemporary");
    const after = classifyCharacter(code);

    token._open =
      !after ||
      (after === constants.characterGroupPunctuation && Boolean(before));
    token._close =
      !before ||
      (before === constants.characterGroupPunctuation && Boolean(after));

    return ok(code);
  }
}
