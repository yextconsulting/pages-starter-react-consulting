import { Event, TokenizeContext } from "micromark-util-types";
import {
  addEvents,
  canClose,
  canOpen,
  removeUnmatchedSequences,
} from "../resolver-utils";

/**
 * Handles and cleans events coming from tokenizeStrikethroughSubscript.
 */
export function resolveAllStrikethroughSubscript(
  events: Event[],
  context: TokenizeContext
): Event[] {
  let index = -1;

  // Walk through all events.
  while (++index < events.length) {
    // Find a token that can close.
    if (canClose(events[index], "tilde")) {
      let open = index;

      // Now walk back to find an opener.
      while (open--) {
        // Find a token that can open the closer.
        if (canOpen(events[open], "tilde")) {
          const markersUsed = calculateMarkersUsed(events[open], events[index]);

          const nextIndex = addEvents(
            events,
            open,
            index,
            context,
            markersUsed === 1 ? "subscript" : "strikethrough",
            markersUsed
          );
          index = nextIndex;
          break;
        }
      }
    }
  }

  removeUnmatchedSequences(events, "tilde");
  return events;
}

/**
 * Calculate the number of markers to use for this matched sequence.
 *
 * In Yext Markdown, if there are only one or two tilde markers in either the
 * opener or closer, then the lesser number is used. If, there are more than 2
 * markers in both the opener and closer, then the number used depends on the
 * length of the closer. If the closer has an odd length, 1 marker is used
 * (subscript), otherwise 2 markers are used (strikethrough).
 */
function calculateMarkersUsed(opener: Event, closer: Event): number {
  const openerLength = opener[1].end.offset - opener[1].start.offset;
  const closerLength = closer[1].end.offset - closer[1].start.offset;

  if (openerLength < 3 || closerLength < 3) {
    return closerLength < openerLength ? closerLength : openerLength;
  } else {
    return closerLength % 2 == 0 ? 2 : 1;
  }
}
