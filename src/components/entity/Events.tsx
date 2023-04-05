import { EventProfile } from "src/types/entities";
import EventCard from "src/components/cards/EventCard";
import Featured from "src/components/entity/Featured";

interface EventProps {
  title: string;
  items: EventProfile[];
  showPastEvents?: boolean;
}

const Events = (props: EventProps) => {
  const { title, items, showPastEvents = false } = props;
  const today = new Date();
  const validEvents = items.filter((event) => {
    if (!showPastEvents && event.time.end) {
      const eventEndDate = new Date(event.time.end);
      return eventEndDate >= today;
    }
    return true;
  });

  return (
    <Featured title={title} items={validEvents} CardComponent={EventCard} />
  );
};

export default Events;
