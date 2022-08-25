import React from "react";
import { Link, Image, HoursStatus } from "@yext/sites-react-components";
import {Address, Hours, CTA, Image as ImageType} from "@yext/types";
import "src/styles/Hero.css";
import ellipse from "src/assets/images/ellipse.svg";

type HeroProps = {
    name: string;
    address: Address;
    background?: ImageType;
    cta1?: CTA;
    cta2?: CTA;
    hours?: Hours;
    numReviews?: number;
    rating?:  number;
}

const Hero = (props: HeroProps) => {
    return (
        <div className="Hero">
            <div className="Hero-container container">
                <div className="Hero-content">  
                    <h1 className="Hero-title Heading Heading--sub">
                        {props.name}
                    </h1>
                    <div className="Hero-geo Heading Heading--lead">
                        {props.address.line1}
                    </div>
                    {props.hours && (
                        <div className="Hero-hours">
                            <HoursStatus hours={props.hours} separatorTemplate={() => <img className="Hero-hourSeparator" src={ellipse} />} dayOfWeekTemplate={()=> null } /> 
                        </div>
                    )}
                    {/* TODO(aganesh) : use Reviews component when available */}
                    {props.rating && (
                        <div className="Hero-reviews">
                            <span className="Hero-rating"> {props.rating} out of 5 </span>
                            <span className="Hero-numReviews">({props.numReviews} reviews)</span>
                        </div>
                    )}
                    {(props.cta1 || props.cta2) && (
                        <div className="Hero-linkWrapper">
                            {props.cta1 && (<Link className="Hero-cta Button Button--primary" cta={props.cta1} />)}
                            {props.cta2 && (<Link className="Hero-cta Button Button--secondary" cta={props.cta2} />)}
                        </div>
                    )}
                </div>
                {props.background && (
                    <div className="Hero-imageWrapper">
                        <Image className="Hero-image" imageField={props.background}/>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Hero;