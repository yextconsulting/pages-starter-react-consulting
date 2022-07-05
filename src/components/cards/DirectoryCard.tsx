
import React from "react";
import { Link } from "@yext/sites-react-components";

interface DirectoryCardProps {
  address: {
	  city: string;
	  countryCode: string;
	  line1: string;
	  line2: string;
	  localizedCountryName: string;
	  localizedRegionName: string;
	  postalCode: string;
	  region: string;
	};
  name: string;
  slug: string;
}

export default function DirectoryCard(props: DirectoryCardProps) {
  const { name, slug, address } = props;

  return (
    <div className="Directorycard u-dropShadowActive bg-white px-6 py-8 border">
      <h3 className="mb-4">
        {slug ? (
          <Link className="Link" link={slug} linkType={"URL"}>
            {name}
          </Link>
        ) : (
          { name }
        )}
      </h3>

      {/* TODO(bhaines): use hours component when it exists */}
      <div className="mb-4">
        <span className="font-bold">OPEN NOW</span> | Closes at 5:00 PM
      </div>

      {/* TODO(bhaines): use address component when it exists */}
      <div className="mb-4">
        <div>
          {address.line1} <span>{address.city}</span>,{" "}
          <span>{address.region}</span> {address.postalCode}
        </div>
      </div>
    </div>
  )
}