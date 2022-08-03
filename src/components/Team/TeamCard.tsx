import React from "react";
import {Image as ImageType} from "@yext/types";
import {Image} from "@yext/sites-react-components";
import "src/styles/TeamCard.css";

export interface financialProfessional {
  name: string;
  headshot?: ImageType;
  mainPhone?: string;
  c_occupation?: string;
  emails?: string[];
  websiteUrl?: Object[];
}

type TeamCardProps = {
  profile: financialProfessional;
}

const TeamCard = (props: TeamCardProps) => {
  const { profile } = props;
  return(
    <div className="TeamCard-container">
      <div className="TeamCard-header">
        {profile.headshot && ( 
          <div className="TeamCard-imageWrapper">
            <Image className="TeamCard-headshot" imageField={profile.headshot} />
          </div>
        )}
        <div className="TeamCard-about">
          <div className="TeamCard-name Heading--sub">
            {profile.name}
          </div>
          {profile.c_occupation && (
            <div className="TeamCard-occupation">
              {profile.c_occupation}
            </div>
          )}
        </div>
      </div>
      <div className="TeamCard-details">
        {/* TODO (aganesh): use Phone component when available */}
        {profile.mainPhone && (
          <div>
            <div className="TeamCard-phoneDisplay">
              {profile.mainPhone}
            </div>
            <a className="TeamCard-phoneLink Link--primary Link--underline" href="tel:{profile.mainPhone}">
              {profile.mainPhone}
            </a>
          </div>
        )}

        {profile.emails && (
          <div className="TeamCard-email">
            <a className="Link--primary Link--underline" href="mailto:{profile.emails[0]}">{profile.emails[0]}</a>
          </div>
        )}

        {profile.websiteUrl && profile.websiteUrl.url && (
          <div className="TeamCard-linkWrapper">
            <a className="TeamCard-link Link--primary" href={profile.websiteUrl.url}>Visit Profile</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard;
