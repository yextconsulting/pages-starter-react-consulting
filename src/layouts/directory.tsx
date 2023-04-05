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
  directoryLevel: "root" | "region";
}

interface DirectoryGridLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<LocationProfile>>;
  directoryLevel: "city";
}

type DirectoryLayoutProps = DirectoryListLayoutProps | DirectoryGridLayoutProps;

const DirectoryLayout = ({ data, directoryLevel }: DirectoryLayoutProps) => {
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
      {(directoryLevel === "region" || directoryLevel === "root") &&
        dm_directoryChildren && (
          <AnalyticsScopeProvider name="directory">
            <DirectoryList
              showNumLocs={true}
              directoryChildren={
                (dm_directoryChildren || []) as DirectoryProfile<never>[]
              }
              relativePrefixToRoot={data.relativePrefixToRoot}
            />
          </AnalyticsScopeProvider>
        )}
      {directoryLevel === "city" && (
        <AnalyticsScopeProvider name="directory">
          <DirectoryGrid
            CardComponent={DirectoryCard}
            directoryChildren={
              (dm_directoryChildren || []) as LocationProfile[]
            }
          />
        </AnalyticsScopeProvider>
      )}
    </>
  );
};

export default DirectoryLayout;
