import React from "react";
import "src/components/Header.css";
import { Image, Link } from "@yext/sites-react-components";
import { CTA, Image as ImageType } from "@yext/types";

type HeaderProps = {
    logo: ImageType;
    links: CTA[];
    linkModifier: string;
}

const Header = (props: HeaderProps) => {
    const { logo, links, linkModifier} = props;
    return (
        <div className="Header flex">
            <div className="Header-logoContainer flex justify-center">
                {/* TODO(dkianersi): include bpSizes prop */}
                <Image className="Header-logo" imageField={logo} />
            </div>
            <div className="Header-content flex justify-center">
                <ul className="flex">
                    {links.map((item: CTA) => (
                        <li key={item.label}>
                            <Link className={`Header-link Link Link--${linkModifier || 'primary'}`} cta={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;