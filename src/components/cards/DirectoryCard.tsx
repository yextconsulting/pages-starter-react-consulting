
import React from "react";
import { HoursStatus } from "@yext/sites-react-components";
import { Link, Address } from "@yext/pages/components";
import { LocationProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";

export const DirectoryCard: CardComponent<LocationProfile> = function DirectoryCard(props): JSX.Element {
  const { profile, relativePrefixToRoot } = props;

  return (
    <div className="Directorycard bg-white px-6 py-8 border h-full">
      <h3 className="mb-4 text-lg font-medium">
        {profile.slug ? (
          <Link href={relativePrefixToRoot + profile.slug} className="Link Link--primary hover:underline">
            {profile.name}
          </Link>
        ) : (
          profile.name
        )}
      </h3>

      {profile.hours && (
        <div className="mb-4 text-sm">
          <HoursStatus hours={profile.hours} />
        </div>
      )}

      {profile.address && (
        <div className="text-sm">
            <Address address={profile.address} lines={[["line1"]]}/>
        </div>
      )}
    </div>
  )
}