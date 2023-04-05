import DirectoryCard from "src/components/cards/DirectoryCard";
import type { CardComponent } from "src/models/cardComponent";
import type { LocationProfile } from "src/types/entities";

interface DirectoryGridProps {
  CardComponent: CardComponent<LocationProfile>;
  directoryChildren: LocationProfile[];
}

const DirectoryGrid = (props: DirectoryGridProps) => {
  const { directoryChildren, CardComponent = DirectoryCard } = props;
  return (
    <div className="container my-8">
      <ul className="flex flex-wrap -m-4">
        {directoryChildren.map((child, idx) => (
          <li className="p-4 w-full md:w-1/2 lg:w-1/3" key={idx}>
            <CardComponent profile={child} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryGrid;
