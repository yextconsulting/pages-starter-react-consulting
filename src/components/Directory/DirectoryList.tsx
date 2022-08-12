import * as React from "react";
import { Link } from "@yext/sites-react-components";
import { DirectoryProfile } from "src/types/entities";
import "src/styles/Directory.css";

export const directoryListFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.dm_directoryChildrenCount",
]

interface DirectoryListProps {
  name: string;
  count: number;
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
}


export function DirectoryList(props: DirectoryListProps) {
  const { name, count, showNumLocs, directoryChildren, relativePrefixToRoot } = props;
  return (
    <div className="container my-8">
      <h1 className="mb-6">
        {/* TODO (cblair): Pull from profile field when it exists */}
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child, idx) => (
          <li className="Directory-listItem" key={idx}>
            <Link
              className="Directory-listLink m-6"
              href={relativePrefixToRoot + child.slug}
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
