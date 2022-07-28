
import React from "react";
import { Link } from "@yext/sites-react-components";
import { CardProps } from "../../models/cardComponent";

export default function DirectoryCard(props: CardProps): JSX.Element {
  const { content } = props;

  return (
    <div className="Directorycard u-dropShadowActive bg-white px-6 py-8 border">
      <h3 className="mb-4">
        {content.slug ? (
          <Link className="Link" href={content.slug} linkType={"URL"}>
            {content.name}
          </Link>
        ) : (
          content.name
        )}
      </h3>

      {/* TODO(bhaines): use hours component when it exists */}
      <div className="mb-4">
        <span className="font-bold">OPEN NOW</span> | Closes at 5:00 PM
      </div>

      {/* TODO(bhaines): use address component when it exists */}
      <div className="mb-4">
        <div>
          {content.address.line1} <span>{content.address.city}</span>,{" "}
          <span>{content.address.region}</span> {content.address.postalCode}
        </div>
      </div>
    </div>
  )
}