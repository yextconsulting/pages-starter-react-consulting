import React from "react";
import { Link, Image } from "@yext/sites-react-components";
import {Address, Hours, CTA, Image as ImageType} from "@yext/types";
import "./Hero.css";

type HeroProps = {
    name: string;
    address: Address;
    background?: ImageType;
    cTA1?: CTA;
    cTA2?: CTA;
    hours?: Hours;
    numReviews?: number;
    rating?:  number;
}

const Hero = (props: HeroProps) => {
    console.log(props);
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    let today = days[new Date().getDay()];

    function isOpen(storeHours, returnStatus) {
        let date = new Date();
        let day = days[date.getDay()];
        let time = date.toLocaleTimeString('en-US', { hour12: false, 
            hour: "numeric", 
            minute: "numeric"});
        let isOpen = time > storeHours[day].openIntervals[0].start && time < storeHours[day].openIntervals[0].end;
        if (returnStatus)
            if (isOpen)
                return 'Open Now';
            else
                return 'Closed';
        else
        {
            if (isOpen)
                return `Closes at ${storeHours[day].openIntervals[0].end}`;
            else
                return `Opens at ${storeHours[day+1].openIntervals[0].open}`;
        }
    }

    return (
        <div className="Hero">
            <div className="Hero-container">
                <div className="Hero-content">  
                    <div className="Hero-title">
                        {props.name}
                    </div>
                    <div className="Hero-geo">
                        {props.address.line1 ? (<div>{props.address.line1}</div>) : (<div>{props.address.city}</div>)}
                    </div>
                    {/* TODO(aganesh) : use Hours component when available */}
                    <div className="Hero-hours">
                        {props.hours && (
                        <div>
                            <span className="Hero-openStatus">{isOpen(props.hours, true)} </span>
                            <span className="Hero-separator"></span><span>{isOpen(props.hours, false)}</span>
                        </div>
                        )}
                    </div>
                    {/* TODO(aganesh) : use Reviews component when available */}
                    {props.rating && (
                        <div>
                            <span className="Hero-rating"> {props.rating} out of 5 </span>
                            <span className="Hero-starRating">STARS</span>
                            <span className="Hero-numReviews">({props.numReviews}) reviews</span>
                        </div>
                    )}
                    <div className="Hero-linkWrapper">
                        {props.cTA1 && (<Link className="Hero-cta" link={props.cTA1}>{props.cTA1.label}</Link>)}
                        {props.cTA2 && (<Link className="Hero-cta" link={props.cTA2}>{props.cTA2.label}</Link>)}
                    </div>
                </div>
                <div className="Hero-imageWrapper">
                    {props.background && (<Image className="Hero-image" imageField={props.background}/>)}
                </div>
            </div>
        </div>
    )
};

export default Hero;