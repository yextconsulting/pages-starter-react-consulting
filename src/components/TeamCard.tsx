import { Link, Image } from "@yext/sites-components";
import type { FinancialProfessionalProfile } from "src/types/entities";
import { FaPhone, FaEnvelope, FaChevronRight } from "react-icons/fa";

type TeamCardProps = {
  profile: FinancialProfessionalProfile;
};

const TeamCard = (props: TeamCardProps) => {
  const { profile } = props;
  return (
    <div className="TeamCard h-full rounded-lg shadow-lg">
      <div className="border-b-2 p-8 flex items-center">
        {profile.headshot && (
          <Image
            className="rounded-full mr-6"
            image={profile.headshot}
            layout="fixed"
            width={80}
            height={80}
          />
        )}
        <div>
          <h3 className="Heading Heading--sub mb-1 font-bold">
            {profile.name}
          </h3>
          {profile.c_occupation && <div>{profile.c_occupation}</div>}
        </div>
      </div>
      {/* TODO (GENERATOR): use Icon component when available */}
      <div className="p-8">
        {/* TODO (GENERATOR): use Phone component when available */}
        {profile.mainPhone && (
          <div className="flex items-center">
            <FaPhone className="text-blue-500 mr-2 flex items-center" />
            <div className="hidden lg:flex">{profile.mainPhone}</div>
            <Link
              className="Link--primary Link--underline flex lg:hidden font-bold"
              href={`tel:${profile.mainPhone}`}
            >
              {profile.mainPhone}
            </Link>
          </div>
        )}

        {profile.emails && (
          <div className="font-bold mt-4 flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" />
            <a
              className="Link--primary Link--underline"
              href={`mailto:${profile.emails[0]}`}
            >
              {profile.emails[0]}
            </a>
          </div>
        )}

        {profile.websiteUrl?.url && (
          <Link
            className="Link--primary mt-6 flex items-center font-bold"
            href={profile.websiteUrl.url}
          >
            Visit Profile
            <FaChevronRight className="text-blue-500 ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
