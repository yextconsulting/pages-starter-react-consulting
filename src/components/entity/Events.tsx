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

interface ProductProps {
  title: string;
  items: EventProfile[];
}

const Events = (props: ProductProps) => {
  const { title, items } = props;
  return (
    <Featured title={title} items={items} FeaturedCardComponent={EventCard}/>
  )
}

export {
  Events,
  defaultFields,
}