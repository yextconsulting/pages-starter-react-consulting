import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "src/styles/Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface FooterProps {
  copyrightMessage: string;
  youtube?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?:string;
  footerLinks: CTA[];
}

const Footer = (props: FooterProps) => {

  const copyrightMessage = props.copyrightMessage;

  const socialLinks = 
  [{link: props.facebook, label: <FaFacebook />}, 
   {link: props.instagram, label: <FaInstagram />},
   {link: props.youtube, label: <FaYoutube />},
   {link: props.linkedIn, label:<FaLinkedinIn />},
   {link: props.twitter, label:<FaTwitter />}].filter(link => link.link);

  const footerLinks = props.footerLinks || [];

  return (
    <footer className="Footer container">
      <div className="Footer-linksContainer flex flex-col">
        {footerLinks.map((link: CTA) => (
          <Link className={'Footer-link Link Link--primary'} key={link.label} cta={link} />
        ))}
      </div>
      <div className="Footer-socialContainer flex">
        {socialLinks.map((socialLink: CTA) => (
            <Link className={'Footer-socialLink Link Link--primary'} key={socialLink.link} href={socialLink.link}>
              {socialLink.label}
            </Link>
          ))}
      </div>
      <div className="Footer-copyright">
        {copyrightMessage}
      </div>
    </footer>
  );
};

export default Footer;