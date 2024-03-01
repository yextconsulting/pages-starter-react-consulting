import DirectoryCard from "src/components/cards/DirectoryCard";
import type { CardComponent } from "src/models/cardComponent";
import type { DirectoryProfile, LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";
import { sortDirectoryByAlphabetical } from "src/common/helpers";

interface DirectoryGridProps {
  CardComponent: CardComponent<LocationProfile>;
}

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryGrid = (props: DirectoryGridProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<LocationProfile>;

  if (profile.dm_directoryChildren) {
    return (
      <ErrorBoundaryWithAnalytics name="directory">
        <DirectoryGridLayout
          CardComponent={props.CardComponent}
          directoryChildren={profile.dm_directoryChildren}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type DirectoryGridLayoutProps = DirectoryGridProps & {
  directoryChildren: LocationProfile[];
};

// This template renders the data into HTML
const DirectoryGridLayout = (props: DirectoryGridLayoutProps) => {
  const { directoryChildren, CardComponent = DirectoryCard } = props;
  const sortedDirectoryChildren =
    sortDirectoryByAlphabetical(directoryChildren);

  return (
    <div className="container my-8">
      <ul className="flex flex-wrap -m-4">
        {sortedDirectoryChildren.map((child, idx) => (
          <li className="p-4 w-full md:w-1/2 lg:w-1/3" key={idx}>
            <CardComponent profile={child} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryGrid;
