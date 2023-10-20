/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import type { LocationProfile, TemplateRenderProps } from "src/types/entities";

import Breadcrumbs from "src/components/common/Breadcrumbs";
import About from "src/components/entity/About";
import Banner from "src/components/entity/Banner";
import Core from "src/components/entity/Core";
import Events from "src/components/entity/Events";
import FAQs from "src/components/entity/FAQs";
import Gallery from "src/components/entity/Gallery";
import Hero from "src/components/entity/Hero";
import Insights from "src/components/entity/Insights";
import Nearby from "src/components/entity/Nearby";
import Products from "src/components/entity/Products";
import Promo from "src/components/entity/Promo";
import Reviews from "src/components/entity/Reviews";
import Team from "src/components/entity/Team";

import type {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Stream,
  Template,
  TemplateConfig,
  TransformProps,
} from "@yext/pages";
import { defaultHeadConfig } from "src/common/head";
import { dedupeStreamFields, formatPhone } from "src/common/helpers";
import "src/index.css";
import { Main } from "src/layouts/main";
import type { TemplateProps } from "src/types/entities";
import { getTranslations } from "../i18n";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const configBuilder: (
  id?: string,
  filter?: Stream["filter"]
) => TemplateConfig = (id?: string, filter?: Stream["filter"]) => ({
  stream: {
    $id: id || "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: dedupeStreamFields([
      "id",
      "uid",
      "logo",
      "c_meta",
      "name",
      "address",
      "mainPhone",
      "tollFreePhone",
      "emails",
      "yextDisplayCoordinate",
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
      "dm_baseEntityCount",
      "slug",
      // About Fields
      "c_aboutSection",
      "description",
      // Banner Fields
      "c_bannerSection",
      // Core Fields
      "address",
      "mainPhone",
      "googlePlaceId",
      "tollFreePhone",
      "emails",
      "hours",
      "additionalHoursText",
      "services",
      // Events Fields
      // "c_eventsSection.title",
      // "c_eventsSection.events.name",
      // "c_eventsSection.events.time",
      // "c_eventsSection.events.description",
      // "c_eventsSection.events.c_primaryCTA",
      // "c_eventsSection.events.photoGallery",
      // FAQ Fields
      // "c_faqSection.title",
      // "c_faqSection.faqs.question",
      // "c_faqSection.faqs.answerV2",
      // Gallery Fields
      "c_gallerySection",
      "photoGallery",
      // Hero Fields
      "c_heroSection",
      "name",
      "address",
      "hours",
      // Insights Fields
      "c_insightsSection.title",
      "c_insightsSection.cta",
      "c_insightsSection.insights.title",
      "c_insightsSection.insights.category",
      "c_insightsSection.insights.photo",
      "c_insightsSection.insights.date",
      "c_insightsSection.insights.descriptionLong",
      "c_insightsSection.insights.descriptionShort",
      "c_insightsSection.insights.cta",
      // Nearby Fields
      "c_nearbySection",
      // Product Fields
      // "c_featuredProductsSection.title",
      // "c_featuredProductsSection.products.name",
      // "c_featuredProductsSection.products.richTextDescriptionV2",
      // "c_featuredProductsSection.products.primaryPhoto",
      // "c_featuredProductsSection.products.c_primaryCTA",
      // Promo Fields
      "c_promoSection",
      // Review Fields
      "c_reviewsSection",
      // Team Fields
      // "c_teamSection.title",
      // "c_teamSection.team.id",
      // "c_teamSection.team.name",
      // "c_teamSection.team.headshot",
      // "c_teamSection.team.mainPhone",
      // "c_teamSection.team.c_occupation",
      // "c_teamSection.team.emails",
      // "c_teamSection.team.websiteUrl",
    ]),
    // Defines the scope of entities that qualify for this stream.
    filter: filter || {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
  },
});

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<LocationProfile>
> = async (data) => {
  const {
    mainPhone,
    fax,
    tollFreePhone,
    mobilePhone,
    ttyPhone,
    localPhone,
    alternatePhone,
    address,
    _site,
    dm_directoryParents,
    name,
  } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  const translations = await getTranslations(data.document.locale);

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
      dm_directoryParents: dm_directoryParents,
    },
    translations,
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
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<LocationProfile>
> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

interface EntityLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

const EntityLayout = ({ data }: EntityLayoutProps) => {
  const {
    id,
    yextDisplayCoordinate,
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
    c_insightsSection: insights,
    c_reviewsSection: reviews,
    dm_directoryParents: directoryParents,
  } = data.document;

  const showBanner = banner?.text && banner?.image;
  const showPromo = promo?.title && promo?.image;
  const showProducts = products?.title && products?.products;
  const showAbout = about?.title && (about.description || description);
  const showGallery = gallery?.images || photoGallery;
  const showTeam = team?.title && team?.team;
  const showFAQ = faq?.title && faq?.faqs;
  const showEvents = events?.title && events.events;
  const showInsights = insights?.title && insights?.insights;

  return (
    <>
      {showBanner && (
        <ErrorBoundaryWithAnalytics name="banner">
          <Banner text={banner.text} image={banner.image} />
        </ErrorBoundaryWithAnalytics>
      )}
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={directoryParents || []}
          separator="/"
          className="container"
          addAnalytics={true}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="hero">
        <Hero
          name={name}
          cta1={hero?.cta1}
          cta2={hero?.cta2}
          address={address}
          background={hero?.background}
          hours={hours}
          numReviews={21}
          rating={4.5}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="core">
        <Core profile={data.document} />
      </ErrorBoundaryWithAnalytics>
      {showPromo && (
        <ErrorBoundaryWithAnalytics name="promo">
          <Promo
            title={promo.title}
            description={promo.description}
            image={promo.image}
            cta={promo.cta}
            googlePlayUrl={promo.googlePlayUrl}
            appStoreUrl={promo.appStoreUrl}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showProducts && (
        <ErrorBoundaryWithAnalytics name="products">
          <Products title={products.title} items={products.products} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showEvents && (
        <ErrorBoundaryWithAnalytics name="events">
          <Events title={events.title} items={events.events} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showAbout && (
        <ErrorBoundaryWithAnalytics name="about">
          <About
            title={about.title}
            image={about.image}
            description={about.description || description}
            cta={about.cta}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showInsights && (
        <ErrorBoundaryWithAnalytics name="insights">
          <Insights
            title={insights.title}
            cta={insights.cta}
            insights={insights.insights}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showGallery && (
        <ErrorBoundaryWithAnalytics name="gallery">
          <Gallery
            title={gallery?.title}
            images={gallery?.images || photoGallery}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showTeam && (
        <ErrorBoundaryWithAnalytics name="team">
          <Team title={team.title} team={team.team} initialSize={3} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showFAQ && (
        <ErrorBoundaryWithAnalytics name="faqs">
          <FAQs title={faq.title} faqs={faq.faqs} />
        </ErrorBoundaryWithAnalytics>
      )}
      <LazyLoadWrapper>
        <ErrorBoundaryWithAnalytics name="reviews">
          <Reviews title={reviews?.title} name={name} entityId={id} />
        </ErrorBoundaryWithAnalytics>
      </LazyLoadWrapper>
      <LazyLoadWrapper>
        <ErrorBoundaryWithAnalytics name="nearby">
          <Nearby
            title={nearby?.title}
            linkToLocator={nearby?.linkToLocator}
            buttonText={nearby?.cta?.label}
            buttonLink={nearby?.cta?.link}
            coordinate={yextDisplayCoordinate}
            id={id}
          />
        </ErrorBoundaryWithAnalytics>
      </LazyLoadWrapper>
    </>
  );
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
const Entity: Template<TemplateRenderProps<LocationProfile>> = (data) => {
  return (
    <Main data={data}>
      <EntityLayout data={data} />
    </Main>
  );
};

export default Entity;
