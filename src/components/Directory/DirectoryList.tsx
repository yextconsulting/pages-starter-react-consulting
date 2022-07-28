import * as React from "react";
import { Link } from "@yext/sites-react-components";
import "../../styles/Directory.css";

export const DirectoryListFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.dm_directoryChildren",
  "dm_directoryChildren.dm_directoryChildrenCount",
]

interface DirectoryListProps {
  name: string;
  count: number;
  showNumLocs: boolean;
  directoryChildren: { slug: string; name: string, dm_directoryChildren: number[] }[];
}

export function DirectoryList(props: DirectoryListProps) {
  const { name, count, showNumLocs, directoryChildren } = props;
  return (
    <div className="container my-8">
      <h1 className="mb-6">
        {/* TODO (cblair): Pull from profile field when it exists */}
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child: any, idx: number) => (
          <li className="Directory-listItem" key={idx}>
            <Link
              className="Directory-listLink Link m-6"
              // TODO (cblair): baseUrl isn't available yet so links don't work
              href={child.slug ? '../' + child.slug : ''}
              linkType="URL"
              data-count={showNumLocs ? child.dm_directoryChildrenCount : ''}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
