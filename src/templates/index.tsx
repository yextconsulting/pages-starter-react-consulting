/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import React, { useEffect, useRef, useState } from "react";
import type {
  Template,
  GetPath,
  TemplateConfig,
  TransformProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import type { TemplateRenderProps, LocationProfile, TemplateProps } from "src/types/entities";
import { dedupeStreamFields } from "src/common/helpers";
import { Main } from 'src/layouts/main';

import { defaultFields as headerFields } from "src/components/common/Header";
import { Banner, defaultFields as bannerFields } from "src/components/entity/Banner";
import { Hero, defaultFields as heroFields } from "src/components/entity/Hero";
import { Core, defaultFields as coreFields } from "src/components/entity/Core";
import { Promo, defaultFields as promoFields } from "src/components/entity/Promo";
import { Gallery, defaultFields as galleryFields } from "src/components/entity/Gallery";
import { About, defaultFields as aboutFields } from "src/components/entity/About";
import { Team, defaultFields as teamFields } from "src/components/entity/Team";
import { FAQs, defaultFields as FAQsFields } from "src/components/entity/FAQs";
import { Nearby, defaultFields as NearbyFields } from "src/components/entity/Nearby";
import { Products, defaultFields as featuredProductFields } from "src/components/entity/Products";
import { Events, defaultFields as eventFields } from "src/components/entity/Events";
import { Insights, defaultFields as InsightsFields } from 'src/components/entity/Insights';
import { formatPhone } from 'src/common/helpers'
import { getRuntime } from "@yext/pages/util";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: dedupeStreamFields([
      "id",
      "uid",
      "logo",
      "meta",
      "name",
      "address",
      "mainPhone",
      "tollFreePhone",
      "emails",
      "geocodedCoordinate",
      "description",
      "hours",
      "googlePlaceId",
      "photoGallery",
      "ref_listings.listingUrl",
      "ref_listings.publisher",
      "additionalHoursText",
      "services",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildrenCount",
      "slug",
      ...headerFields,
      ...bannerFields,
      ...heroFields,
      ...coreFields,
      ...promoFields,
      ...featuredProductFields,
      ...galleryFields,
      ...aboutFields,
      ...teamFields,
      ...FAQsFields,
      ...NearbyFields,
      ...eventFields,
      ...InsightsFields,
    ]),
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
  alternateLanguageFields: [
    "name",
    "slug"
  ],
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
 export const transformProps: TransformProps<TemplateRenderProps> = async (data: any) => {
  const {
    mainPhone,
    fax,
    tollFreePhone,
    mobilePhone,
    ttyPhone,
    localPhone,
    alternatePhone,
    address
  } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      mainPhone: formatPhone(mainPhone, address.countryCode),
      fax: formatPhone(fax, address.countryCode),
      tollFreePhone: formatPhone(tollFreePhone, address.countryCode),
      mobilePhone: formatPhone(mobilePhone, address.countryCode),
      ttyPhone: formatPhone(ttyPhone, address.countryCode),
      localPhone: formatPhone(localPhone, address.countryCode),
      alternatePhone: formatPhone(alternatePhone, address.countryCode),
    }
  };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
 export const getPath: GetPath<TemplateProps<LocationProfile>> = (data) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps<LocationProfile>> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Index: Template<TemplateRenderProps<LocationProfile>> = (data) => {
  const {
    id,
    geocodedCoordinate,
    name,
    address,
    description,
    hours,
    photoGallery,
    c_bannerSection: banner,
    c_heroSection: hero,
    c_promoSection: promo,
    c_featuredProductsSection: products,
    c_aboutSection: about,
    c_gallerySection: gallery,
    c_teamSection: team,
    c_faqSection: faq,
    c_nearbySection: nearby,
    c_eventsSection: events,
    c_insightsSection: insights
  } = data.document;


  const sectionThreeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("ref", sectionThreeRef)
    if (sectionThreeRef.current) {
      console.log("Scroll Position: ", sectionThreeRef.current.offsetHeight)
    }
  }, [sectionThreeRef])

  const sections = [
    {
      heading: "Section One",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      heading: "Section Two",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      heading: "Section Three",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      heading: "Section Four",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      heading: "Section Five",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    }
  ]

  function isInViewport(el: any) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
  }

  const [isHighlighted, setIsHighlighted] = useState(true)

  return (
    <div className="flex flex-col">
      <div className="flex">
        <ul className="my-20 flex flex-col w-[350px] h-[100vh]">
          {sections.map((section, i) => {
            const liClass = (i == 2) && isHighlighted ? "bg-orange-100" : ''
            return (
              <li className={liClass}>
                <a href={`#${section.heading}`} className="Link Link--primary my-4">{section.heading}</a>
              </li>
            )
          })}
        </ul>
        <div onScroll={() => {
          // if (sectionThreeRef.current) {
          //   if (isInViewport(sectionThreeRef.current) && !isHighlighted) {
          //     setIsHighlighted(true)
          //   }

          //   if (!isInViewport(sectionThreeRef.current) && isHighlighted) {
          //     setIsHighlighted(false)
          //   }
          // }
        }} className="flex flex-col overflow-scroll h-[100vh]">
          {sections.map((section, i) => <Section key={i} {...section}/>)}
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  heading: string
  content: string
}

function Section(props: SectionProps) {
  const elRef = useRef<HTMLDivElement>(null)
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };


  const runtime = getRuntime()

  useEffect(() => {
    if (!runtime.isServerSide) {
      let observer = new IntersectionObserver(() => {
        console.log("Intersecting: ", props.heading)
      }, options);
      if (elRef.current) {
        observer.observe(elRef.current);
      }
    }
  }, [elRef]) 

  return (
    <div ref={elRef} className="my-[700px] border border-solid border-black">
      <h2 id={props.heading} className="Heading Heading--head">{props.heading}</h2>
      <div>{props.content}</div>
    </div>
  )

}

export default Index;
