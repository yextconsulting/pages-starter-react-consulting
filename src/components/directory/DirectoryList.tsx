import { Link } from "@yext/pages/components";
import type { DirectoryProfile } from "src/types/entities";
import { DirectoryHero } from "src/components/directory/DirectoryHero";
import "src/styles/Directory.css";

export const directoryListFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.dm_baseEntityCount",
  "dm_directoryChildren.dm_directoryChildren.slug",
  "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
  "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
];

interface DirectoryListProps {
  name: string;
  brand: string;
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
}

// Skip directory levels that would only render one option.
const getSkipLevelSlug = (child: DirectoryProfile<never>): string => {
  if (child.dm_directoryChildren?.length === 1) {
    return getSkipLevelSlug(child.dm_directoryChildren[0]);
  }
  return child.slug;
};

export function DirectoryList(props: DirectoryListProps) {
  const { name, brand, showNumLocs, directoryChildren, relativePrefixToRoot } =
    props;
  return (
    <div className="my-8">
      <DirectoryHero title={name} subtitle={brand} />
      <div className="container my-8">
        <ul className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
          {directoryChildren.map((child, idx) => (
            <li className="Directory-listItem" key={idx}>
              <Link
                className="Directory-listLink m-3"
                href={relativePrefixToRoot + getSkipLevelSlug(child)}
                data-count={
                  showNumLocs ? "(" + child.dm_baseEntityCount + ")" : ""
                }
              >
                <span className="text-brand-primary hover:underline">
                  {child.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
