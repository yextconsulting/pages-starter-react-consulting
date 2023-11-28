import DirectoryCard from "src/components/cards/DirectoryCard";
import type { CardComponent } from "src/models/cardComponent";
import type { DirectoryProfile, LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";

interface DirectoryGridProps {
  CardComponent: CardComponent<LocationProfile>;
}

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryGrid = (props: DirectoryGridProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<LocationProfile>;

  if (profile.dm_directoryChildren) {
    return (
      <DirectoryGridLayout
        CardComponent={props.CardComponent}
        directoryChildren={profile.dm_directoryChildren}
      />
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
  return (
    <ErrorBoundaryWithAnalytics name="directory">
      <div className="container my-8">
        <ul className="flex flex-wrap -m-4">
          {directoryChildren.map((child, idx) => (
            <li className="p-4 w-full md:w-1/2 lg:w-1/3" key={idx}>
              <CardComponent profile={child} />
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundaryWithAnalytics>
  );
};

export default DirectoryGrid;
