import React from "react";
import { Image, Link } from "@yext/sites-react-components";
import { financialProfessional } from "src/types/entities";
import { FaPhone, FaEnvelope, FaChevronRight } from "react-icons/fa";
import "src/styles/TeamCard.css";

type TeamCardProps = {
  profile: financialProfessional;
}

const TeamCard = (props: TeamCardProps) => {
  const { profile } = props;
  return(
    <div className="TeamCard-container">
      <div className="TeamCard-header border-b-2 p-8">
        {profile.headshot && ( 
          <Image className="TeamCard-headshot" imageField={profile.headshot} />
        )}
        <div className="TeamCard-about p-6">
          <div className="TeamCard-name Heading--sub mb-1 font-bold">
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
      <div className="TeamCard-details p-8">
        {/* TODO (GENERATOR): use Phone component when available */}
        {profile.mainPhone && (
          <div className="TeamCard-bulleted">
            <FaPhone className="text-blue-500 mr-2" />
            <div className="TeamCard-phoneDisplay">
              {profile.mainPhone}
            </div>
            <Link className="TeamCard-phoneLink Link--primary Link--underline" href={`tel:${profile.mainPhone}`}>
              {profile.mainPhone}
            </Link>
          </div>
        )}

        {profile.emails && (
          <div className="TeamCard-bulleted font-bold mt-4">
            <FaEnvelope className="text-blue-500 mr-2" />
            <a className="Link--primary Link--underline" href={`mailto:${profile.emails[0]}`}>{profile.emails[0]}</a>
          </div>
        )}

        {profile.websiteUrl && profile.websiteUrl.url && (
          <div className="TeamCard-bulleted mt-6">
            <Link className="TeamCard-link Link--primary" href={profile.websiteUrl.url}>Visit Profile</Link>
            <FaChevronRight className="text-blue-500 ml-2" />
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard;
