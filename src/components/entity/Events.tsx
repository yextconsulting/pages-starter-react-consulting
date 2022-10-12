import { Featured } from "src/components/entity/Featured";
import { EventCard } from "src/components/cards/EventCard";
import { EventProfile } from "src/types/entities";

const defaultFields: string[] = [
  "c_eventsSection.title",
  "c_eventsSection.events.name",
  "c_eventsSection.events.time",
  "c_eventsSection.events.description",
  "c_eventsSection.events.c_primaryCTA",
  "c_eventsSection.events.photoGallery"
];

interface EventProps {
  title: string;
  items: EventProfile[];
  showPastEvents?: boolean;
}

const Events = (props: EventProps) => {
  const { title, items, showPastEvents = false } = props;
  const today = new Date();
  const validEvents = items.filter(event => {
    if (!showPastEvents && event.time.end) {
      const eventEndDate = new Date(event.time.end);
      return (eventEndDate >= today)
    }
    return true;
  });

  return (
    <Featured title={title} items={validEvents} CardComponent={EventCard}/>
  )
}

export {
  Events,
  defaultFields,
}