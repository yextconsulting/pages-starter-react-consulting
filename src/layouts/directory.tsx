import type {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";
import { AnalyticsScopeProvider } from "@yext/pages/components";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import DirectoryCard from "src/components/cards/DirectoryCard";
import DirectoryGrid from "src/components/directory/DirectoryGrid";
import DirectoryHero from "src/components/directory/DirectoryHero";
import DirectoryList from "src/components/directory/DirectoryList";

interface DirectoryListLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<DirectoryProfile<never>>>;
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
      <AnalyticsScopeProvider name="directory_hero">
        <DirectoryHero title={name} brand={_site.c_brand} />
      </AnalyticsScopeProvider>
      <AnalyticsScopeProvider name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={dm_directoryParents || []}
          separator="/"
          className="container flex justify-center"
          addAnalytics={true}
        />
      </AnalyticsScopeProvider>
      {dm_directoryChildren && !isDirectoryGrid(dm_directoryChildren) && (
        <AnalyticsScopeProvider name="directory">
          <DirectoryList
            showNumLocs={true}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={data.relativePrefixToRoot}
          />
        </AnalyticsScopeProvider>
      )}
      {dm_directoryChildren && isDirectoryGrid(dm_directoryChildren) && (
        <AnalyticsScopeProvider name="directory">
          <DirectoryGrid
            CardComponent={DirectoryCard}
            directoryChildren={dm_directoryChildren}
          />
        </AnalyticsScopeProvider>
      )}
    </>
  );
};

export default DirectoryLayout;
