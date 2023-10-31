import { Event, TokenizeContext } from "micromark-util-types";
import {
  addEvents,
  canClose,
  canOpen,
  removeUnmatchedSequences,
} from "../resolver-utils";

/**
 * Handles and cleans events coming from tokenizeUnderline.
 */
export function resolveAllUnderline(
  events: Event[],
  context: TokenizeContext
): Event[] {
  let index = -1;

  // Walk through all events.
  while (++index < events.length) {
    // Find a token that can close.
    // The token must have at least 2 markers (`++`) because
    // underline matches `++<text>++` sequences.
    if (
      canClose(events[index], "underline") &&
      events[index][1].end.offset - events[index][1].start.offset > 1
    ) {
      let open = index;

      // Now walk back to find an opener.
      while (open--) {
        // Find a token that can open the closer.
        // The token must have at least 2 markers (`++`) because
        // underline matches `++<text>++` sequences.
        if (
          canOpen(events[open], "underline") &&
          events[open][1].end.offset - events[open][1].start.offset > 1
        ) {
          const nextIndex = addEvents(
            events,
            open,
            index,
            context,
            "underline",
            2
          );
          index = nextIndex;
          break;
        }
      }
    }
  }

  removeUnmatchedSequences(events, "underline");
  return events;
}
