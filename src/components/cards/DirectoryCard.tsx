
import React from "react";
import { HoursStatus } from "@yext/sites-react-components";
import { Link, Address } from "@yext/pages/components";
import { CardProps } from "src/models/cardComponent";

export default function DirectoryCard(props: CardProps): JSX.Element {
  const { content, relativePrefixToRoot } = props;

  return (
    <div className="Directorycard bg-white px-6 py-8 border h-full">
      <h3 className="mb-4 text-lg font-medium">
        {content.slug ? (
          <Link href={relativePrefixToRoot + content.slug} className="Link Link--primary hover:underline">
            {content.name}
          </Link>
        ) : (
          content.name
        )}
      </h3>
      
      {content.hours && (
        <div className="mb-4 text-sm">
          <HoursStatus hours={content.hours} />
        </div>
      )}

      {content.address && (
        <div className="text-sm">
            <Address address={content.address} lines={[["line1"]]}/>
        </div>
      )}
    </div>
  )
}