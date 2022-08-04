import React from "react";
import DirectoryCard from "src/components/cards/DirectoryCard"
import { DirectoryCardContent, CardComponent } from "src/models/cardComponent";
import "src/styles/Directory.css";
import { LocationProfile } from "src/types/entities";

export const directoryGridFields = [
  "dm_directoryParents",
  "dm_directoryChildren.slug",
  "dm_directoryChildren.name",
  "dm_directoryChildren.address",
  "dm_directoryChildren.hours",
]

interface DirectoryGridProps {
  name: string
  count: number
  CardComponent: CardComponent
  directoryChildren: LocationProfile[]
  relativePrefixToRoot: string
}

export function DirectoryGrid(props: DirectoryGridProps) {
  const { name, count, directoryChildren, relativePrefixToRoot, CardComponent = DirectoryCard } = props;
  return (
    <div>
      <h1 className="mb-6">
        {/* TODO (cblair): Pull full title from custom field when it exists on directory entities */}
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child, idx) => (
          renderCard(CardComponent, child, relativePrefixToRoot, idx)
        ))}
      </ul>
    </div>
  )
}

function renderCard(
  CardComponent: CardComponent,
  childContent: DirectoryCardContent,
  relativePrefixToRoot: string,
  index: number
): JSX.Element {
  return (
    <li className="Directory-listItem" key={index}>
      <CardComponent content={childContent} relativePrefixToRoot={relativePrefixToRoot} />
    </li>
  )
}