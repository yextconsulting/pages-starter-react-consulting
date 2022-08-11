import React from "react";
import { Link, HoursTable, Address, LocationMap } from "@yext/sites-react-components";
import { Address as AddressType, Hours, Coordinate } from "@yext/types";
import { GoogleMaps } from "@yext/components-tsx-maps";
import { getDirections } from "@yext/sites-react-components";
import { mapPin } from "src/assets/images/mapPin.svg"
import "src/styles/Core.css";

export const coreFields = [
    "address",
    "geocodedCoordinate",
    "mainPhone",
    "tollFreePhone",
    "emails",
    "hours",
    "services",
    "additionalHoursText"
]

type CoreProps = {
    address: AddressType;
    coordinates: Coordinate;
    mainPhone?: string;
    tollFreePhone?: string;
    emails?: string[];
    hours?: Hours;
    services?: string[];
    additionalHoursText?: string;
}

const Core = (props: CoreProps) => {
    console.log(getDirections(props.address, GoogleMaps, true));
    return(
        <div className="Core">
            <div className="Core-container centered-container">
                <div className="Core-infoSection">
                    <div className="Core-subSection mb-8">
                        <div className="Heading--sub mb-4 font-bold"> Information </div>
                        <Address address={props.address} lines={[["line1"], ["line2"], ["city", "regionCode", "postalCode"]]} />
                        {/* TOOD: add getDirections */}
                        <Link className="Core-directionsCta Link--primary Link--underline mt-2" href={`${getDirections(props.address)}`}> Get Directions </Link>
                        {props.mainPhone && (
                            <div className="Core-phoneWrapper mt-4">
                                <span className="Core-label mr-2 font-bold">Phone</span>
                                <span>{props.mainPhone}</span>
                            </div>
                        )}
                        {props.tollFreePhone && (
                            <div className="Core-phoneWrapper mt-4">
                                <span className="Core-label mr-2 font-bold">Toll-free</span>
                                <span>{props.tollFreePhone}</span>
                            </div>
                        )}
                        {props.emails && (
                            <Link className="Core-email Link--primary Link--underline mt-4" href={`mailto:${props.emails[0]}`}>{props.emails[0]}</Link>
                        )}
                    </div>
                {(props.hours || props.additionalHoursText) && (
                    <div className="Core-subSection mb-8">
                        <div className="Heading--sub mb-4 font-bold"> Hours </div>
                        {props.hours && (
                            <HoursTable hours={props.hours} startOfWeek={"Monday"} />
                        )}
                        {props.additionalHoursText && (
                            <div className="mt-4">{props.additionalHoursText}</div>
                        )}
                    </div>
                )}
                {props.services && (
                    <div className="Core-subSection mb-8">
                        <div className="Heading--sub mb-4 font-bold"> Services </div>
                        <ul className="Core-serviceList">
                            {props.services.map((service) => (
                                <li className="Core-serviceListItem mb-2" key={service}>{service}</li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>
                <div className="Core-map mt-16"> 
                    <LocationMap clientKey={'gme-yextinc'} coordinate={props.coordinates} provider={GoogleMaps}>
                        <svg width="56" height="58" viewBox="0 0 56 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z" fill="#0F70F0" stroke="black" stroke-opacity="0.5"/>
                            <path d="M28.095 27.2577C32.5571 27.2577 36.1743 23.6405 36.1743 19.1784C36.1743 14.7163 32.5571 11.0991 28.095 11.0991C23.633 11.0991 20.0157 14.7163 20.0157 19.1784C20.0157 23.6405 23.633 27.2577 28.095 27.2577Z" fill="white"/>
                        </svg>
                    </LocationMap>
                </div>
            </div>
      </div>
    );
}

export default Core;