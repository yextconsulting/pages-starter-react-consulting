import React from "react";
import "./Header.css";
import { Image, Link } from "@yext/sites-react-components";
import { CTA, Image as ImageType } from "@yext/types";

type HeaderProps = {
    logo: ImageType;
    links: CTA[];
}

const Header = (props: HeaderProps) => {
    const { logo, links } = props;
    console.log(links);
    return (
        <div className="Header flex">
            <div className="Header-logoContainer flex justify-center">
                <Image className="Header-logo" imageField={logo} />
            </div>
            <div className="Header-content flex justify-center">
                <ul className="Header-links flex">
                    {links.map((item: CTA) => (
                        <li key={item.label}>
                            <Link className="Header-link" cta={item}></Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;