import React from "react";
import {Image as ImageType} from "@yext/types";
import {Image} from "@yext/sites-react-components";

export interface financialProfessional {
  name: string;
  headshot?: ImageType;
  mainPhone?: string;
}

type TeamCardProps = {
  name: string;
  headshot?: ImageType;
  mainPhone?: string;
  emails?: string[];
}

const TeamCard = (props: TeamCardProps) => {
  console.log(props);
  return(
    <div>
      <div className="TeamCard-header">
        {props.headshot && ( 
          <div className="TeamCard-imageWrapper">
            <Image className="TeamCard-headshot" imageField={props.headshot} />
          </div>
        )}
        <div className="TeamCard-name">
          {props.name}
        </div>
      </div>
      <div className="TeamCard-details">
        {props.mainPhone && (
          //add svg icon for phone as ::before
          <div className="TeamCard-phone">
            {props.mainPhone}
          </div>
        )}
        {props.emails && (
          //add svg icon for email as ::before
          <div className="TeamCard-email">
            {props.emails[0]}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard;
