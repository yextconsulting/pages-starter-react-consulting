import type {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";
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

const DirectoryLayout = ({ data }: DirectoryLayoutProps) => {
  const { dm_directoryParents, dm_directoryChildren } = data.document;

  return (
    <>
      <DirectoryHero />
      <Breadcrumbs
        breadcrumbs={dm_directoryParents || []}
        separator="/"
        className="container flex justify-center"
      />
      {dm_directoryChildren && isDirectoryGrid(dm_directoryChildren) && (
        <DirectoryGrid CardComponent={DirectoryCard} />
      )}
      {dm_directoryChildren && !isDirectoryGrid(dm_directoryChildren) && (
        <DirectoryList showNumLocs={true} />
      )}
    </>
  );
};

// Type guard to determine whether to render the DirectoryGrid or DirectoryList component
// based on the type of dm_directoryChildren.
const isDirectoryGrid = (
  children: LocationProfile[] | DirectoryProfile<never>[]
): children is LocationProfile[] => {
  return children.length > 0 && "address" in children[0];
};

export default DirectoryLayout;
