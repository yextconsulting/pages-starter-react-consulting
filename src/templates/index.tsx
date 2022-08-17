/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import React from "react";
import Core from "src/components/Core/Core";
import Team from "src/components/Team/Team";
import Hero from "src/components/Hero/Hero";
import {
  TemplateProps,
  TemplateRenderProps,
  Template,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { CustomFieldDebuggerReactProvider } from '@yext/custom-field-debugger';
import { defaultHeadConfig } from "src/common/head";
import { LocationProfile } from "src/types/entities";
import { teamFields } from "src/components/Team/Team";
import Footer from "src/components/Footer"; 
import Testimonials from "src/components/Testimonials";
import Reviews from "src/components/Reviews";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
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
      "additionalHoursText",
      "services",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildrenCount",
      "c_hero",
      ...teamFields,
    ],
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
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
 export const getPath: GetPath<TemplateProps> = (data) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (data): HeadConfig => {
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
const Index: Template<TemplateRenderProps> = (data) => {
  const document = data.document as LocationProfile;
  const {
    name,
    address,
    hours,
    c_team,
    c_hero,
    _site
  } = document;
  return (
    <CustomFieldDebuggerReactProvider component={Index} {...data}>
      {c_team && (
        <Team team={c_team} initialSize={3}/>
      )}
      {/* TODO(aganesh) : use Reviews component when available */}
      <Hero name={name} background={c_hero?.background} address={address} cta1={c_hero?.cta1} cta2={c_hero?.cta2} hours={hours} numReviews={21} rating={4.5} />
      <Core profile={document} address={address}/>
      {c_team && (
        <Team team={c_team} initialSize={3}/>
      )}
      <Reviews />
      <Testimonials />
      <Footer
        copyrightMessage={_site.c_copyrightMessage}
        facebook={_site.c_facebook}
        instagram={_site.c_instagram}
        youtube={_site.c_youtube}
        twitter={_site.c_twitter}
        linkedIn={_site.c_linkedIn}
        footerLinks={_site.c_footerLinks}
      />
    </CustomFieldDebuggerReactProvider>
  );
};

export default Index;
