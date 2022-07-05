import * as React from "react";
import { Link } from "@yext/sites-react-components";
import DirectoryCard from "../cards/DirectoryCard"
import "../../styles/Directory.css";

interface DirectoryListProps {
  name: string;
  count: number;
  showNumLocs: boolean;
  directoryChildren: { slug: string; name: string, dm_directoryChildren: number[] }[];
}

interface DirectoryGridProps {
  name: string;
  count: number;
  directoryChildren: { 
    slug: string; 
    name: string;
    dm_directoryChildren: number[];
    address: {
      city: string;
      countryCode: string;
      line1: string;
      line2: string;
      localizedCountryName: string;
      localizedRegionName: string;
      postalCode: string;
      region: string;
    }; 
  }[];
}

export function AceList(props: DirectoryListProps) {
  const { name, count, showNumLocs, directoryChildren } = props;
  return (
    <div className="container my-8">
      <h1 className="mb-6">
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child: any, idx: number) => (
          <li className="Directory-listItem" key={idx}>
            <Link
              className="Directory-listLink Link m-6"
              // TODO (cblair): baseUrl isn't available yet so links don't work
              link={child.slug ? child.slug : ''}
              linkType={"URL"}
              data-count={showNumLocs ? child.dm_directoryChildren.length : ''}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AceGrid(props: DirectoryGridProps) {
  const { name, count, directoryChildren } = props;
  return (
    <div>
      <h1 className="mb-6">
        {count} locations in {name}
      </h1>
      <ul className="flex flex-wrap">
        {directoryChildren.map((child: any, idx: number) => (
          <li className="Directory-listItem" key={idx}>
            {/* TODO (cblair): Use render prop to allow user to pass in specific teaser cards */}
            <DirectoryCard
              // TODO (cblair): baseUrl isn't available yet so links don't work
              slug={child.slug ? child.slug : ''}
              address={child.address}
              name={child.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}