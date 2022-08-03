import React from "react";
import {Image as ImageType, Address} from "@yext/types";
import {Image} from "@yext/sites-react-components";
import "src/styles/TeamCard.css";

export interface financialProfessional {
  name: string;
  address?: Address;
  headshot?: ImageType;
  mainPhone?: string;
  c_occupation?: string;
  emails?: string[];
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
        {profile.mainPhone && (
          //add svg icon for phone as ::before
          <div className="TeamCard-phone">
            {profile.mainPhone}
          </div>
        )}
        {profile.emails && (
          //add svg icon for email as ::before
          <div className="TeamCard-email">
            {profile.emails[0]}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard;
