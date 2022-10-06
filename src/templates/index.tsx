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
import type {
  TemplateProps,
  TemplateRenderProps,
  Template,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import type { LocationProfile } from "src/types/entities";
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
      "ref_listings",
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
      locales: ["en", "es"],
      primary: false,
    },
  },
  alternateLanguageFields: [
    "name",
  ],
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
  } = document;

  const showBanner = banner?.text && banner?.image;
  const showPromo = promo?.title && promo?.image;
  const showProducts = products?.title && products?.products;
  const showAbout = about?.title && (about.description || description);
  const showGallery = gallery?.images || photoGallery;
  const showTeam = team?.title && team?.team;
  const showFAQ = faq?.title && faq?.faqs;
  const showEvents = events?.title && events.events;
  const showInsights = insights?.title && insights?.insights

  return (
    <Main data={data}>
      {showBanner && <Banner text={banner.text} image={banner.image} />}
      <Hero name={name} cta1={hero?.cta1} cta2={hero?.cta2} address={address} background={hero?.background} hours={hours} numReviews={21} rating={4.5} />
      <Core profile={document} />
      {showPromo && <Promo title={promo.title} description={promo.description} image={promo.image} cta={promo.cta} googlePlayUrl={promo.googlePlayUrl} appStoreUrl={promo.appStoreUrl} />}
      {showProducts && <Products title={products.title} items={products.products} />}
      {showEvents && <Events title={events.title} items={events.events} />}
      {showAbout && <About title={about.title} image={about.image} description={about.description || description} cta={about.cta} />}
      {showInsights && <Insights title={insights.title} cta={insights.cta} insights={insights.insights} />}
      {showGallery && <Gallery title={gallery?.title} images={gallery?.images || photoGallery} />}
      {showTeam && <Team title={team.title} team={team.team} initialSize={3} />}
      {showFAQ && <FAQs title={faq.title} faqs={faq.faqs} />}
      <Nearby
        title={nearby?.title}
        linkToLocator={nearby?.linkToLocator}
        buttonText={nearby?.cta?.label}
        buttonLink={nearby?.cta?.link}
        geocodedCoordinate={geocodedCoordinate}
        id={id}
        relativePrefixToRoot={data.relativePrefixToRoot}
      />
    </Main>
  );
};

export default Index;