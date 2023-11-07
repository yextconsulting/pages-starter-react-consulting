// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck inlined library code

import { push, splice } from "micromark-util-chunked";
import { resolveAll } from "micromark-util-resolve-all";
import { types } from "micromark-util-symbol/types";
import { Event, TokenizeContext, Point, Token } from "micromark-util-types";

/**
 * Whether the event can be a closing token for the given type of sequence.
 */
export function canClose(event: Event, sequenceType: string): boolean {
  return !!(
    event[0] === "enter" &&
    event[1].type === `${sequenceType}SequenceTemporary` &&
    event[1]._close
  );
}

/**
 * Whether the event can be an opening token for the given type of sequence.
 */
export function canOpen(event: Event, sequenceType: string): boolean {
  return !!(
    event[0] === "exit" &&
    event[1].type === `${sequenceType}SequenceTemporary` &&
    event[1]._open
  );
}

/**
 * Add events for the matched sequence to the provided events.
 * Returns the index after the added events at which the resolver
 * should continue searching for sequences.
 */
export function addEvents(
  events: Event[],
  openIndex: number,
  closeIndex: number,
  context: TokenizeContext,
  sequenceType: string,
  markersUsed: number
): number {
  const [openingSequence, closingSequence, text, group] = createTokens(
    events[openIndex],
    events[closeIndex],
    sequenceType,
    markersUsed
  );

  events[openIndex][1].end = Object.assign({}, openingSequence.start);
  events[closeIndex][1].start = Object.assign({}, closingSequence.end);

  let nextEvents: Event[] = [];

  // If there are more markers in the opening, add them before.
  if (events[openIndex][1].end.offset - events[openIndex][1].start.offset) {
    nextEvents = push(nextEvents, [
      ["enter", events[openIndex][1], context],
      ["exit", events[openIndex][1], context],
    ]);
  }

  // Opening.
  nextEvents = push(nextEvents, [
    ["enter", group, context],
    ["enter", openingSequence, context],
    ["exit", openingSequence, context],
    ["enter", text, context],
  ]);

  // Between.
  nextEvents = push(
    nextEvents,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(openIndex + 1, closeIndex),
      context
    )
  );

  // Closing.
  nextEvents = push(nextEvents, [
    ["exit", text, context],
    ["enter", closingSequence, context],
    ["exit", closingSequence, context],
    ["exit", group, context],
  ]);

  let offset = 0;

  // If there are more markers in the closing, add them after.
  if (events[closeIndex][1].end.offset - events[closeIndex][1].start.offset) {
    offset = 2;
    nextEvents = push(nextEvents, [
      ["enter", events[closeIndex][1], context],
      ["exit", events[closeIndex][1], context],
    ]);
  }

  splice(events, openIndex - 1, closeIndex - openIndex + 3, nextEvents);

  const nextIndex = openIndex + nextEvents.length - offset - 2;
  return nextIndex;
}

/**
 * Create the tokens for a given type of sequence: a token for the
 * opening marker(s), a token for the text inside the sequence, a token
 * for the closing marker(s), and a parent token for the whole group.
 */
function createTokens(
  opener: Event,
  closer: Event,
  sequenceType: string,
  markersUsed: number
): Token[] {
  const start: Point = Object.assign({}, opener[1].end);
  const end: Point = Object.assign({}, closer[1].start);
  movePoint(start, -markersUsed);
  movePoint(end, markersUsed);

  const openingSequence: Token = {
    type: `${sequenceType}Sequence`,
    start,
    end: Object.assign({}, opener[1].end),
  };
  const closingSequence: Token = {
    type: `${sequenceType}Sequence`,
    start: Object.assign({}, closer[1].start),
    end,
  };
  const text: Token = {
    type: `${sequenceType}Text`,
    start: Object.assign({}, opener[1].end),
    end: Object.assign({}, closer[1].start),
  };
  const group: Token = {
    type: `${sequenceType}`,
    start: Object.assign({}, openingSequence.start),
    end: Object.assign({}, closingSequence.end),
  };

  return [openingSequence, closingSequence, text, group];
}

/**
 * Move a point a bit.
 *
 * Note: `move` only works inside lines! It’s not possible to move past other
 * chunks (replacement characters, tabs, or line endings).
 */
function movePoint(point: Point, offset: number): void {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
}

/**
 * Remove any unmatched temporary sequences of the given sequence type from the
 * events.
 */
export function removeUnmatchedSequences(
  events: Event[],
  sequenceType: string
) {
  events.forEach((event) => {
    if (event[1].type === `${sequenceType}SequenceTemporary`) {
      event[1].type = types.data;
    }
  });
}
