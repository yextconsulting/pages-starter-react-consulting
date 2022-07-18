import React from "react";
import { Link, Image } from "@yext/sites-react-components";
import {CTA, Image as ImageType} from "@yext/types";
import "./Hero.scss";

type HeroProps = {
    background: ImageType;
    links: CTA[];
}

const Hero = (props: HeroProps) => {
    const { background, links} = props;
    return (
        <div className="Hero">
            <div className="Hero-container">
                <div className="Hero-content">
                    <ol>
                    {links.map((link: CTA) => (
                        <div key={link.label}>
                           <li><Link className="Hero-link" cta={link} /></li>
                        </div>
                    ))}
                    </ol>
                </div>
                <div className="Hero-imageWrapper">
                    <Image className="Hero-image" src={background.url} />
                </div>
            </div>
        </div>
    )
};

export default Hero;