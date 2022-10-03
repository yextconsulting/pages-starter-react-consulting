
import React from "react";
import { Image, Link } from "@yext/pages/components";
import { EventProfile } from "src/types/entities";
import { FeaturedCardComponent } from "src/models/cardComponent";

export const EventCard: FeaturedCardComponent<EventProfile> = function EventCard(props): JSX.Element {
  const { content } = props;

  return (
      <>
       {content.profile.photoGallery[0] && (
          <div className="flex justify-center h-[187px] mb-8">
            <Image layout="fill" image={content.profile.photoGallery[0].image}/>
          </div>
        )}
        <div className="Heading Heading--sub mx-8">
          {content.profile.name}
        </div>
        {content.profile.time && (
          <div className="mx-8 mt-4">
            {formatEventDate(content.profile.time.start, content.profile.time.end)}
          </div>
        )}
        {content.profile.description && (
          <div className="mx-8 mt-4">
            {content.profile.description}
          </div>
        )}
        {content.profile.c_primaryCTA && (
            <div className="flex mx-8 mt-8 mb-4">
              <Link className="self-start Button Button--secondary" cta={content.profile.c_primaryCTA} />
            </div>
          )}
      </>
  )
}

function formatEventDate(startTime: string, endTime: string) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return (
    <div className="Event-subheading">
      <span className="Event-date">
        {startDate.toLocaleDateString("en-US").replaceAll('/', '.')}
      </span>
      <span className="mr-4 ml-4">|</span>
      <span className="Event-start">
        {startDate.toLocaleString('en-US', { hour: 'numeric', hour12: true })}
      </span>
      <span className="mr-2 ml-2">-</span>
      <span className="Event-end">
        {endDate.toLocaleString('en-US', { hour: 'numeric', hour12: true })}
      </span>
    </div>
  )
}
