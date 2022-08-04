import React from "react";
import {Image as ImageType} from "@yext/types";
import {Image, Link} from "@yext/sites-react-components";
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
          <Image className="TeamCard-headshot" imageField={profile.headshot} />
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
      {/* TODO (GENERATOR): use Icon component when available */}
      <div className="TeamCard-details">
        {/* TODO (GENERATOR): use Phone component when available */}
        {profile.mainPhone && (
          <div>
            <div className="TeamCard-phoneDisplay">
              {profile.mainPhone}
            </div>
            <Link className="TeamCard-phoneLink Link--primary Link--underline" href="tel:{profile.mainPhone}">
              {profile.mainPhone}
            </Link>
          </div>
        )}

        {profile.emails && (
          <div className="TeamCard-email">
            <a className="Link--primary Link--underline" href="mailto:{profile.emails[0]}">{profile.emails[0]}</a>
          </div>
        )}

        {profile.websiteUrl && profile.websiteUrl.url && (
          <div className="TeamCard-linkWrapper">
            <Link className="TeamCard-link Link--primary" href={profile.websiteUrl.url}>Visit Profile</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard;
