import { DirectoryCard } from "src/components/cards/DirectoryCard"
import type { CardComponent } from "src/models/cardComponent";
import { DirectoryHero } from "src/components/directory/DirectoryHero";
import type { LocationProfile } from "src/types/entities";
import "src/styles/Directory.css";

export const directoryGridFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.address",
  "dm_directoryChildren.hours",
]

interface DirectoryGridProps {
  name: string
  brand: string
  CardComponent: CardComponent<LocationProfile>
  directoryChildren: LocationProfile[]
}

export function DirectoryGrid(props: DirectoryGridProps) {
  const { name, brand, directoryChildren, CardComponent = DirectoryCard } = props;
  return (
    <div className="my-8">
      <DirectoryHero title={name} subtitle={brand} />
      <div className="container my-8">
        <ul className="flex flex-wrap">
          {directoryChildren.map((child, idx: number) => (
            <li className="Directory-listItem p-4 w-full md:w-1/2 lg:w-1/3" key={idx}>
              <CardComponent profile={child} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
