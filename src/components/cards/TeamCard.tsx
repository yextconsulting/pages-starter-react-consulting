import { Link, Image } from "@yext/pages-components";
import type { FinancialProfessionalProfile } from "src/types/entities";
import { FaPhone, FaEnvelope, FaChevronRight } from "react-icons/fa";

type TeamCardProps = {
  profile: FinancialProfessionalProfile;
};

const TeamCard = (props: TeamCardProps) => {
  const { profile } = props;
  return (
    <div className="h-full rounded-lg shadow-lg">
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
          <h3 className="heading heading-sub mb-1 font-bold">{profile.name}</h3>
          {profile.c_occupation && <div>{profile.c_occupation}</div>}
        </div>
      </div>
      {/* TODO (GENERATOR): use Icon component when available */}
      <div className="p-8">
        {/* TODO (GENERATOR): use Phone component when available */}
        {profile.t_mainPhone && (
          <div className="flex items-center">
            <FaPhone className="text-brand-primary mr-2 flex items-center" />
            <div className="hidden lg:flex">{profile.t_mainPhone.label}</div>
            <Link
              className="link-primary link-underline flex lg:hidden font-bold"
              href={profile.t_mainPhone.href}
            >
              {profile.t_mainPhone.label}
            </Link>
          </div>
        )}

        {profile.emails && (
          <div className="font-bold mt-4 flex items-center">
            <FaEnvelope className="text-brand-primary mr-2" />
            <a
              className="link-primary link-underline"
              href={`mailto:${profile.emails[0]}`}
            >
              {profile.emails[0]}
            </a>
          </div>
        )}

        {profile.websiteUrl?.url && (
          <Link
            className="link-primary mt-6 flex items-center font-bold"
            href={profile.websiteUrl.url}
          >
            Visit Profile
            <FaChevronRight className="text-brand-primary ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
