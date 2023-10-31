import { Event, TokenizeContext } from "micromark-util-types";
import {
  addEvents,
  canClose,
  canOpen,
  removeUnmatchedSequences,
} from "../resolver-utils";

/**
 * Handles and cleans events coming from tokenizeSuperscript.
 */
export function resolveAllSuperscript(
  events: Event[],
  context: TokenizeContext
): Event[] {
  let index = -1;

  // Walk through all events.
  while (++index < events.length) {
    // Find a token that can close.
    if (canClose(events[index], "superscript")) {
      let open = index;

      // Now walk back to find an opener.
      while (open--) {
        // Find a token that can open the closer.
        if (canOpen(events[open], "superscript")) {
          const nextIndex = addEvents(
            events,
            open,
            index,
            context,
            "superscript",
            1
          );
          index = nextIndex;
          break;
        }
      }
    }
  }

  removeUnmatchedSequences(events, "superscript");
  return events;
}
