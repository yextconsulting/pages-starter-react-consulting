
import React from "react";
import { HoursStatus } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import { CardProps } from "src/models/cardComponent";

export default function DirectoryCard(props: CardProps): JSX.Element {
  const { content, relativePrefixToRoot } = props;

  return (
    <div className="Directorycard drop-shadow bg-white px-6 py-8 border">
      <h3 className="mb-4">
        {content.slug ? (
          <Link href={relativePrefixToRoot + content.slug}>
            {content.name}
          </Link>
        ) : (
          content.name
        )}
      </h3>
      
      {content.hours && (
        <div className="mb-4">
          <HoursStatus hours={content.hours} />
        </div>
      )}

      {/* TODO(cblair): use address component when we figure out ExtendedAddress typing error */}
      <div className="mb-4">
        <div>
          {content.address.line1} <span>{content.address.city}</span>,{" "}
          <span>{content.address.region}</span> {content.address.postalCode}
        </div>
      </div>
    </div>
  )
}