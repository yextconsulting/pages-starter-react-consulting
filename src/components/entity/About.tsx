import type { Image as ImageType, CTA as CTAType } from "@yext/types";
import { Link, Image } from "@yext/pages-components";
import { useTemplateData } from "src/common/useTemplateData";
import { LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

const About = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const about = profile.c_aboutSection;

  if (about?.title && (about.description || profile.description)) {
    return (
      <ErrorBoundaryWithAnalytics name="about">
        <AboutLayout
          title={about.title}
          image={about.image}
          description={about.description || profile.description}
          cta={about.cta}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type AboutLayoutProps = {
  image?: ImageType;
  title: string;
  description?: string;
  cta?: CTAType;
};

const AboutLayout = (props: AboutLayoutProps) => {
  return (
    <div className="About py-8 sm:py-16">
      <div className="container flex flex-col md:flex-row gap-8 md:gap-16">
        {props.image && (
          <div className="w-full md:w-1/2">
            <Image image={props.image} />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h2 className="heading heading-head">{props.title}</h2>

          {props.description && <div>{props.description}</div>}

          {props.cta && (
            <Link
              className="inline-flex self-start btn btn-secondary"
              cta={props.cta}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
