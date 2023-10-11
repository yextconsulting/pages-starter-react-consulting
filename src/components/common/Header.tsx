import type { CTA, Image as ImageType } from "@yext/types";
import { Image, Link } from "@yext/sites-components";
import c from "classnames";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MaybeLink } from "src/components/common/MaybeLink";

type HeaderProps = {
  links: CTA[];
  logo?: ImageType;
  logoLink?: string;
};

const Header = (props: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logo, logoLink, links } = props;

  return (
    <header className="Header relative">
      <div className="container py-5 flex justify-start md:justify-between">
        {logo && (
          <MaybeLink className="Header-logoLink" href={logoLink}>
            <div className="flex w-[144px] mr-2">
              <Image image={logo} layout="fill" />
            </div>
          </MaybeLink>
        )}

        <div className="hidden md:flex items-center">
          <ul className="flex">
            {links.map((item: CTA) => (
              <li key={item.label}>
                <Link
                  className="Link Link--primary Link--header mx-2 lg:mx-5"
                  cta={item}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className="flex md:hidden absolute p-4 right-0 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
          <span className="sr-only">Toggle Header Menu</span>
        </button>
      </div>

      <div
        className={
          c({ visible: menuOpen }) +
          "hidden absolute top-full left-0 right-0 h-screen bg-white"
        }
      >
        <div className="container">
          <ul className="flex flex-col">
            {links.map((item: CTA) => (
              <li key={item.label}>
                <Link className="Link Link--header py-3 block" cta={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export { Header };
