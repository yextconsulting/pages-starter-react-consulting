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
  companyName: string;
  youtube?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?:string;
  footerLinks: CTA[];
}

function currentYear() {
  return new Date().getFullYear();
}

const Footer = (props: FooterProps) => {

  const companyName = props.companyName;

  const socialLinks = 
  [{link: props.facebook, label: <FaFacebook />}, 
   {link: props.instagram, label: <FaInstagram />},
   {link: props.youtube, label: <FaYoutube />},
   {link: props.linkedIn, label:<FaLinkedinIn />},
   {link: props.twitter, label:<FaTwitter />}]

  const footerLinks = props.footerLinks;



  return (
    <footer className="Footer centered-container">
      <div className="Footer-linksContainer flex flex-col">
        {footerLinks.map((link: CTA) => (
          <Link className={'Footer-link Link Link--primary'} key={link.label} cta={link} />
        ))}
      </div>
       <div className="Footer-socialContainer flex">
       {socialLinks.map((socialLink: CTA) => (
          <Link className={'Footer-socialLink'} key={socialLink.label} cta={socialLink} />
        ))}
      </div>
      <div className="Footer-copyright">
      © {currentYear()} {companyName}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;