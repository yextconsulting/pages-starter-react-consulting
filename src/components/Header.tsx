import React, { useState } from "react";
import "src/components/Header.css";
import { Image, Link } from "@yext/sites-react-components";
import { CTA, Image as ImageType } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";
import classNames from "classnames";

type HeaderProps = {
    logo: ImageType;
    links: CTA[];
    linkModifier?: string;
    onToggle?: (isOpen: boolean) => void;
    className?: string
}

const Header = (props: HeaderProps) => {
    const { logo, links, linkModifier, onToggle = () => {}} = props;
    const [ showMenu, setShowMenu ] = useState(false);
    const isDesktop = useBreakpoint('md');

    const renderLinks = () => (
        <ul className="Header-links">
            {links.map((item: CTA, i) => (
                <li className="flex" key={i}>
                    <Link className={`py-4 w-full Header-link Link Link--${linkModifier || 'primary'}`} cta={item} />
                </li>
            ))}
        </ul>
    )

    return (
        <div className={classNames("Header z-50 top-0 inset-x-0 bg-white", props.className)}>
            <div className="Header-top py-3 shadow-md">
                <div className="flex justify-between items-center container">
                    <Image className="Header-logo" imageField={logo} />

                    {!isDesktop && <div className="Header-menuButton" onClick={() => {
                        setShowMenu(!showMenu)
                        onToggle(!showMenu);
                    }}>
                        <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>}
                    {isDesktop && renderLinks()}
                </div>
            </div>
            {!isDesktop && (
                <div className={`left-0 right-0 fixed bg-inherit overflow-hidden duration-500 transition-[height] ${showMenu ? "h-screen" : "h-0"}`}>
                    <ul className="Header-links container flex">
                        {renderLinks()}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;