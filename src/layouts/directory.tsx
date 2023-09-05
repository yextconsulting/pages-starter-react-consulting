import type {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import DirectoryCard from "src/components/cards/DirectoryCard";
import DirectoryGrid from "src/components/directory/DirectoryGrid";
import DirectoryHero from "src/components/directory/DirectoryHero";
import DirectoryList from "src/components/directory/DirectoryList";

interface DirectoryListLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<never>>;
}

interface DirectoryGridLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<LocationProfile>>;
}

type DirectoryLayoutProps = DirectoryListLayoutProps | DirectoryGridLayoutProps;

// Type guard to determine whether to render the DirectoryGrid or DirectoryList component
// based on the type of dm_directoryChildren.
const isDirectoryGrid = (
  children: LocationProfile[] | DirectoryProfile<never>[]
): children is LocationProfile[] => {
  return children.length > 0 && "address" in children[0];
};

const DirectoryLayout = ({ data }: DirectoryLayoutProps) => {
  const { name, dm_directoryChildren, dm_directoryParents, _site } =
    data.document;

  return (
    <>
      <ErrorBoundaryWithAnalytics name="directory_hero">
        <DirectoryHero title={name} brand={_site.c_brand} />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={dm_directoryParents || []}
          separator="/"
          className="container flex justify-center"
          addAnalytics={true}
        />
      </ErrorBoundaryWithAnalytics>
      {dm_directoryChildren && !isDirectoryGrid(dm_directoryChildren) && (
        <ErrorBoundaryWithAnalytics name="directory">
          <DirectoryList
            showNumLocs={true}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={data.relativePrefixToRoot}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {dm_directoryChildren && isDirectoryGrid(dm_directoryChildren) && (
        <ErrorBoundaryWithAnalytics name="directory">
          <DirectoryGrid
            CardComponent={DirectoryCard}
            directoryChildren={dm_directoryChildren}
          />
        </ErrorBoundaryWithAnalytics>
      )}
    </>
  );
};

export default DirectoryLayout;
