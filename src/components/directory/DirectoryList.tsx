import { Link } from "@yext/pages-components";
import type { DirectoryProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";

interface DirectoryListProps {
  showNumLocs: boolean;
}

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryList = (props: DirectoryListProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<never>;
  const relativePrefixToRoot = templateData.relativePrefixToRoot;

  if (profile.dm_directoryChildren) {
    return (
      <DirectoryListLayout
        directoryChildren={profile.dm_directoryChildren}
        relativePrefixToRoot={relativePrefixToRoot}
        showNumLocs={props.showNumLocs}
      />
    );
  }

  return null;
};

interface DirectoryListLayoutProps {
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
}

// This template renders the data into HTML
const DirectoryListLayout = (props: DirectoryListLayoutProps) => {
  const { showNumLocs, directoryChildren, relativePrefixToRoot } = props;
  return (
    <ErrorBoundaryWithAnalytics name="directory">
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
    </ErrorBoundaryWithAnalytics>
  );
};

export default DirectoryList;
