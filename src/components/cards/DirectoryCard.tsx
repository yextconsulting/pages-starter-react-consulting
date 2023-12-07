import { HoursStatus } from "@yext/sites-react-components";
import { Address } from "@yext/sites-components";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";
import { useTemplateData } from "src/common/useTemplateData";
import { MaybeLink } from "src/components/common/MaybeLink";

const DirectoryCard: CardComponent<
  LocationProfile | LiveAPIProfile<LocationProfile>
> = function DirectoryCard(props): JSX.Element {
  const { profile } = props;
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <div className="Directorycard bg-white px-6 py-8 border h-full">
      <h3 className="mb-4 text-lg font-medium">
        <MaybeLink
          className="Link Link--primary hover:underline"
          href={profile.slug ? relativePrefixToRoot + profile.slug : ""}
        >
          {profile.name}
        </MaybeLink>
      </h3>

      {profile.hours && (
        <div className="mb-4 text-sm">
          <HoursStatus hours={profile.hours} />
        </div>
      )}

      {profile.address && (
        <div className="text-sm">
          <Address address={profile.address} lines={[["line1"]]} />
        </div>
      )}
    </div>
  );
};

export default DirectoryCard;
