import * as React from "react";
import { Link } from "@yext/sites-react-components";
import DirectoryCard from "../cards/DirectoryCard"
import { DirectoryCardContent, CardComponent } from "../../models/cardComponent";
import "../../styles/Directory.css";
import { Address } from "@yext/types"

export const DirectoryGridFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.dm_directoryChildren",
  "dm_directoryChildren.dm_directoryChildrenCount",
  "dm_directoryChildren.address",
  "dm_directoryChildren.hours",
]

interface DirectoryGridProps {
  name: string;
  count: number;
  CardComponent: CardComponent;
  directoryChildren: { 
    slug: string;
    name: string;
    dm_directoryChildren: number[];
    address: Address;
  }[];
}

export function DirectoryGrid(props: DirectoryGridProps) {
  const { name, count, directoryChildren, CardComponent = DirectoryCard } = props;
  return (
    <div>
      <h1 className="mb-6">
        {/* TODO (cblair): Pull from profile field when it exists */}
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child: any, idx: number) => (
          renderCard(CardComponent, child, idx)
        ))}
      </ul>
    </div>
  )
}

function renderCard(
  CardComponent: CardComponent,
  childContent: DirectoryCardContent,
  index: number
): JSX.Element {
  return (
    <li className="Directory-listItem" key={index}>
      <CardComponent content={childContent}/>
    </li>
  )
}