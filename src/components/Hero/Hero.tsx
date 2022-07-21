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
                    </div>
                    {/* TODO(aganesh) : use Reviews component when available */}
                    {props.rating && (
                        <div className="Hero-reviews">
                            <span className="Hero-rating"> {props.rating} out of 5 </span>
                            <span className="Hero-numReviews">({props.numReviews}) reviews</span>
                        </div>
                    )}
                    <div className="Hero-linkWrapper">
                        {props.cTA1 && (<Link className="Hero-cta" cta={props.cTA1} />)}
                        {props.cTA2 && (<Link className="Hero-cta Hero-cta--border" cta={props.cTA2} />)}
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