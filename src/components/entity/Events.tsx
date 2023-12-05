import { EventProfile, LocationProfile } from "src/types/entities";
import EventCard from "src/components/cards/EventCard";
import Featured from "src/components/entity/Featured";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

type EventsProps = {
  showPastEvents?: boolean;
};

const Events = (props: EventsProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const events = profile.c_eventsSection;

  if (events?.title && events.events) {
    return (
      <ErrorBoundaryWithAnalytics name="events">
        <EventsLayout
          title={events.title}
          items={events.events}
          showPastEvents={props.showPastEvents}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type EventsLayoutProps = EventsProps & {
  title: string;
  items: EventProfile[];
};

const EventsLayout = (props: EventsLayoutProps) => {
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
