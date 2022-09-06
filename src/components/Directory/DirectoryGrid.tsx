import React from "react";
import DirectoryCard from "src/components/cards/DirectoryCard"
import { DirectoryCardContent, CardComponent } from "src/models/cardComponent";
import { DirectoryHero } from "src/components/Directory/DirectoryHero";
import { LocationProfile } from "src/types/entities";
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
  count: number
  CardComponent: CardComponent
  directoryChildren: LocationProfile[]
  relativePrefixToRoot: string
}

export function DirectoryGrid(props: DirectoryGridProps) {
  const { name, count, directoryChildren, relativePrefixToRoot, CardComponent = DirectoryCard } = props;
  return (
    <div className="my-8">
      {/* TODO: change subtitle with custom field when created */}
      <DirectoryHero title={name} subtitle={"Business Name"} relativePrefixToRoot={relativePrefixToRoot} />
      <div className="container my-8">
        <ul className="flex flex-wrap">
          {directoryChildren.map((child: any, idx: number) => (
            renderCard(CardComponent, child, relativePrefixToRoot, idx)
          ))}
        </ul>
      </div>
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
    <li className="Directory-listItem p-4 w-full md:w-1/2 lg:w-1/3" key={index}>
      <CardComponent content={childContent} relativePrefixToRoot={relativePrefixToRoot} />
    </li>
  )
}