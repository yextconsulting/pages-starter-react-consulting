import { DirectoryCard } from "src/components/cards/DirectoryCard";
import type { CardComponent } from "src/models/cardComponent";
import type { LocationProfile } from "src/types/entities";

export const directoryGridFields = [
  "dm_directoryParents.slug",
  "dm_directoryParents.name",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.address",
  "dm_directoryChildren.hours",
];

interface DirectoryGridProps {
  CardComponent: CardComponent<LocationProfile>;
  directoryChildren: LocationProfile[];
}

export function DirectoryGrid(props: DirectoryGridProps) {
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
}
