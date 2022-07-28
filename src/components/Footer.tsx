import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "../styles/Footer.css";

interface FooterProps {
  socialLinks: CTA[];
  footerLinks: CTA[];
}

function currentYear() {
  return new Date().getFullYear();
}

const Footer = (props: FooterProps) => {
  const socialLinks = props.socialLinks;
  const footerLinks = props.footerLinks;

  return (
    <footer className="Footer">
            <div className="Footer-linksContainer flex flex-col">
        {footerLinks.map((item: CTA) => (
          <Link className={'Footer-link'} key={item.label} cta={item} />
        ))}
      </div>
{/*       <div className="Footer-socialContainer flex">
        {socialLinks.map((item: CTA) => (
          <Link className={'Footer-link'} cta={item} />
        ))}
      </div> */}
      <div className="Footer-copyright">
      © {currentYear()} Cobalt Design System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;