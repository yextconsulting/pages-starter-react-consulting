import React from 'react';
import { StandardProps } from '../../types';

export interface AddressProps extends StandardProps {
  address: Address,
  linkToGetDirections?: string,
};

export type Address = {
  line1: string;
  line2?: string;
  sublocality?: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

const Address = (props: AddressProps) => {
  const { address, linkToGetDirections, yaTrack } = props;

  // prob need different versions for different countries
  let addressEl = 
    <>
      <div className="Address-line1">{address.line1}</div>
      <div className="Address-cityRegion">
        <span>{address.city}</span>, <span>{address.region}</span> <span>{address.postalCode}</span>
      </div>
      <div className="Address-country">
        {address.countryCode}
      </div>
    </>;
  
  if (linkToGetDirections) {
    addressEl = 
      <a className="Address-getDirectionLink"
         href={linkToGetDirections}
         data-ga-category="Get Directions/Location Address"
         data-ya-track={yaTrack || 'directions_address'}
         target="_blank" rel="noopener noreferrer"
         >
        {addressEl}
      </a>;
  }

  return (
    <>
      <div className="" data-country={address.countryCode}>
        {addressEl}
      </div>
    </>
  );
};

export default Address;
