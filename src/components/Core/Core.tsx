import React from "react";
import {Link, HoursTable, Address, Map} from "@yext/sites-react-components";
import {Address as AddressType, Hours} from "@yext/types";

type CoreProps = {
    address: AddressType;
    mainPhone?: string;
    tollFreePhone?: string;
    emails?: string[];
    hours?: Hours;
    services?: string[];
    alternateHoursText?: string;
}

const Core = (props: CoreProps) => {
    return(
        <div className="Core-container">
            <div className="Core-info">
                {/* Comma separators not showing up & type of address prop -> ExtendedAddress expected but of type Address */}
                <Address address={props.address} lines={[["line1"], ["line2"], ["city", "regionCode", "postalCode"]]} /> 
                {/* TODO(GENERATOR): add getDirections */}
                <Link className="Link Link--primary Link--underline" href=""> Get Directions </Link>

                {props.mainPhone && (
                    <div className="Core-phoneWrapper">
                        <span className="Core-label">Phone</span>
                        <span>{props.mainPhone}</span>
                    </div>
                )}
                {props.tollFreePhone && (
                    <div className="Core-phoneWrapper">
                        <span className="Core-label">Toll-free</span>
                        <span>{props.tollFreePhone}</span>
                    </div>
                )}
                {props.emails && (
                    <Link className="Core-email Link Link--primary Link--underline" href="mailto:{props.emails[0]}">{props.emails[0]}</Link>
                )}
            </div>
            {/* HoursTable needs to be implemented */}
            {props.hours && (
                <div className="Core-hours">
                    <HoursTable hours={props.hours} />
                </div>
            )}
            {props.services && (
                <div className="Core-services">
                    <div className="Core-serviceTitle">Services</div>
                    <ul className="Core-serviceList">
                        {props.services.map((service) => (
                            <li className="Core-serviceListItem">{service}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="Core-map"> 
                
            </div>
        </div>
    );
}

export default Core;