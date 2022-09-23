import React from "react";
import { Link } from "@yext/pages/components";
import type { CTA } from "@yext/types";
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
  [{link: props.facebook, label: <FaFacebook className="w-5 h-5 mr-4" />}, 
   {link: props.instagram, label: <FaInstagram className="w-5 h-5 mr-4" />},
   {link: props.youtube, label: <FaYoutube className="w-5 h-5 mr-4" />},
   {link: props.linkedIn, label:<FaLinkedinIn className="w-5 h-5 mr-4" />},
   {link: props.twitter, label:<FaTwitter className="w-5 h-5 mr-4" />}].filter(link => link.link);

  const footerLinks = props.footerLinks || [];

  return (
    <footer className="Footer py-8 sm:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center">
            {footerLinks.map((link, i) => (
              <Link className="Link Link--primary mb-4 md:mb-0 md:mr-4" key={i} cta={link} />
            ))}
          </div>

          <div className="my-4 md:my-0 flex flex-row items-center justify-center md:justify-end">
            {socialLinks.map((socialLink, i) => (
              <Link className="Link Link--primary" key={i} href={socialLink.link}>
                {socialLink.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-sm text-center md:text-left mt-4">
          {copyrightMessage}
        </div>
      </div>
    </footer>
  );
};

export default Footer;