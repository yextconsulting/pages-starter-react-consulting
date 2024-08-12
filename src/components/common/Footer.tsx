import type { CTA } from "@yext/types";
import { Link } from "@yext/pages-components";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";

const Footer = () => {
  const templateData = useTemplateData();
  const siteProfile = templateData.document._site;

  return (
    <ErrorBoundaryWithAnalytics name="footer">
      <FooterLayout
        copyrightMessage={siteProfile.c_copyrightMessage || ""}
        facebook={siteProfile.c_facebook}
        instagram={siteProfile.c_instagram}
        youtube={siteProfile.c_youtube}
        twitter={siteProfile.c_twitter}
        linkedIn={siteProfile.c_linkedIn}
        footerLinks={siteProfile.c_footerLinks || []}
      />
    </ErrorBoundaryWithAnalytics>
  );
};

interface FooterLayoutProps {
  copyrightMessage: string;
  youtube?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  footerLinks: CTA[];
}

const FooterLayout = (props: FooterLayoutProps) => {
  const copyrightMessage = props.copyrightMessage;

  const socialLinks = [
    {
      name: "facebook",
      link: props.facebook,
      label: <FaFacebook className="w-5 h-5 mr-4" />,
    },
    {
      name: "instagram",
      link: props.instagram,
      label: <FaInstagram className="w-5 h-5 mr-4" />,
    },
    {
      name: "youtube",
      link: props.youtube,
      label: <FaYoutube className="w-5 h-5 mr-4" />,
    },
    {
      name: "linkedIn",
      link: props.linkedIn,
      label: <FaLinkedinIn className="w-5 h-5 mr-4" />,
    },
    {
      name: "twitter",
      link: props.twitter,
      label: <FaTwitter className="w-5 h-5 mr-4" />,
    },
  ].filter((link) => link.link);

  const footerLinks = props.footerLinks || [];

  return (
    <footer className="py-8 sm:py-16">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center">
            {footerLinks.map((link, i) => (
              <Link
                className="link-primary mb-4 sm:mb-0 sm:mr-4"
                key={i}
                cta={link}
                eventName={`link${i}`}
              />
            ))}
          </div>

          <div className="my-4 sm:my-0 flex flex-row items-center justify-center sm:justify-end">
            {socialLinks.map((socialLink, i) =>
              socialLink.link ? (
                <Link
                  className="link-primary"
                  key={i}
                  href={socialLink.link}
                  eventName={socialLink.name}
                >
                  {socialLink.label}
                </Link>
              ) : null
            )}
          </div>
        </div>

        <div className="text-sm text-center sm:text-left mt-4">
          {copyrightMessage}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
