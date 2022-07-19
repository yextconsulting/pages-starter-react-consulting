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

interface FooterProps {
  instagram: URL;
  youtube: URL;
  linkedIn: URL;
  pinterest: URL;
  facebook: URL;
  links: CTA[];
}

function currentYear() {
  return new Date().getFullYear();
}

 const Footer = (props: FooterProps) => {
   const socialLinks = [
    {link: props.facebook, label: <FaFacebook size={28} color="white" />},
    {link: props.pinterest, label: <FaPinterest size={28} color="white" />},
    {link: props.youtube, label: <FaYoutube size={28} color="white" />},
    {link: props.instagram, label: <FaInstagram size={28} color="white" />},
    {link: props.linkedIn, label: <FaLinkedinIn size={28} color="white" />},
  ].filter(x => x.link) 

  return (
    <footer className="Footer">
      {socialLinks.map((link) => (
        <Link className="Footer-Link" key={link.link} link={link}>
          {link.label}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;