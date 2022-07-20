import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import "../styles/Footer.css";

interface FooterProps {
/*   instagram: URL;
  youtube: URL;
  linkedIn: URL;
  pinterest: URL;
  facebook: URL;
}

function currentYear() {
  return new Date().getFullYear();
}

const Footer = (props: FooterProps) => {
   const socialLinks = [
    {link: props.facebook, label: <FaFacebook />},
    {link: props.pinterest, label: <FaPinterest />},
    {link: props.youtube, label: <FaYoutube />},
    {link: props.instagram, label: <FaInstagram />},
    {link: props.linkedIn, label: <FaLinkedinIn />},
  ].filter(x => x.link) 

  const footerLinks = [    
    {link: props.links[0], label: 'Footer Link'},
    {link: props.links[1], label: 'Footer Link'},
    {link: props.links[2], label: 'Footer Link'},
    {link: props.links[3], label: 'Footer Link'},
    {link: props.links[4], label: 'Footer Link'},
    {link: props.links[5], label: 'Footer Link'},
  ].filter(x => x.link)

  return (
    <footer className="Footer">
      <div className="Footer-SocialContainer">
        {socialLinks.map((link) => (
          <Link className="Footer-SocialLink" key={link.link} link={link}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="Footer-Copyright">
      © 2021 Cobalt Design System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;