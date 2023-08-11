import { Link } from "@yext/sites-components";
import type { DirectoryProfile } from "src/types/entities";

interface DirectoryListProps {
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
}

const DirectoryList = (props: DirectoryListProps) => {
  const { showNumLocs, directoryChildren, relativePrefixToRoot } = props;
  return (
    <div className="container my-8">
      <ul className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 -m-3">
        {directoryChildren.map((child, idx) => (
          <li className="p-3" key={idx}>
            <Link
              className="inline-block after:content-[attr(data-count)] after:ml-2"
              href={relativePrefixToRoot + child.slug}
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
  );
};

export default DirectoryList;
