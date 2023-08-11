import { Image, Link } from "@yext/sites-components";
import { EventProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";

const EventCard: CardComponent<EventProfile> = function EventCard(
  props
): JSX.Element {
  const { profile } = props;

  return (
    <>
      {profile.photoGallery?.[0] && (
        <div className="flex justify-center h-[187px] mb-8">
          <Image layout="fill" image={profile.photoGallery[0].image} />
        </div>
      )}
      <div className="Heading Heading--sub mx-8">{profile.name}</div>
      {profile.time && (
        <div className="mx-8 mt-4">
          {formatEventDate(profile.time.start, profile.time.end)}
        </div>
      )}
      {profile.description && (
        <div className="mx-8 mt-4">{profile.description}</div>
      )}
      {profile.c_primaryCTA && (
        <div className="flex mx-8 mt-8 mb-4">
          <Link
            className="self-start Button Button--secondary"
            cta={profile.c_primaryCTA}
          />
        </div>
      )}
    </>
  );
};

// TODO (cblair): Currently this is only set up to handle events that take place on a single day.
// Need to potentially figure out if we want to customizeable logic in here
// to handle multi-day events and different edge cases
function formatEventDate(startTime: string, endTime: string) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return (
    <div className="Event-subheading">
      <span className="Event-date">
        {startDate.toLocaleDateString("en-US").replaceAll("/", ".")}
      </span>
      <span className="mr-4 ml-4">|</span>
      <span className="Event-start">
        {startDate.toLocaleString("en-US", { hour: "numeric", hour12: true })}
      </span>
      <span className="mr-2 ml-2">-</span>
      <span className="Event-end">
        {endDate.toLocaleString("en-US", { hour: "numeric", hour12: true })}
      </span>
    </div>
  );
}

export default EventCard;
