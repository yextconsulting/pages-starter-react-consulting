import * as React from "react";
import { Link } from "@yext/sites-react-components";
import DirectoryCard from "../cards/DirectoryCard"
import { DirectoryCardContent, CardComponent } from "../../models/cardComponent";
import "../../styles/Directory.css";
import { Address } from "@yext/types"

interface DirectoryListProps {
  name: string;
  count: number;
  showNumLocs: boolean;
  directoryChildren: { slug: string; name: string, dm_directoryChildren: number[] }[];
}

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

export function ChildList(props: DirectoryListProps) {
  const { name, count, showNumLocs, directoryChildren } = props;
  return (
    <div className="container my-8">
      <h1 className="mb-6">
        {/* TODO (cblair): Pull from profile field when it exists */}
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child: any, idx: number) => (
          <li className="Directory-listItem" key={idx}>
            <Link
              className="Directory-listLink Link m-6"
              // TODO (cblair): baseUrl isn't available yet so links don't work
              link={child.slug ? '../' + child.slug : ''}
              linkType="URL"
              data-count={showNumLocs ? child.dm_directoryChildrenCount : ''}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TeaserGrid(props: DirectoryGridProps) {
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