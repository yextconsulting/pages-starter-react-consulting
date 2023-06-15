/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

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
import type {
  TemplateRenderProps,
  LocationProfile,
  TemplateProps,
} from "src/types/entities";
import { dedupeStreamFields } from "src/common/helpers";
import { formatPhone } from "src/common/helpers";
import { Main } from "src/layouts/main";
import EntityLayout from "src/layouts/entity";
import { fetchReviews } from "src/components/entity/utils/fetchReviews";

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
      "c_eventsSection.title",
      "c_eventsSection.events.name",
      "c_eventsSection.events.time",
      "c_eventsSection.events.description",
      "c_eventsSection.events.c_primaryCTA",
      "c_eventsSection.events.photoGallery",
      // FAQ Fields
      "c_faqSection.title",
      "c_faqSection.faqs.question",
      "c_faqSection.faqs.answer",
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
      "c_featuredProductsSection.title",
      "c_featuredProductsSection.products.name",
      "c_featuredProductsSection.products.richTextDescription",
      "c_featuredProductsSection.products.primaryPhoto",
      "c_featuredProductsSection.products.c_primaryCTA",
      // Promo Fields
      "c_promoSection",
      // Review Fields
      "c_reviewsSection",
      "ref_reviewsAgg.reviewCount", // This is required in order to update the stream every time a new review is created.
      // Team Fields
      "c_teamSection.title",
      "c_teamSection.team.id",
      "c_teamSection.team.name",
      "c_teamSection.team.headshot",
      "c_teamSection.team.mainPhone",
      "c_teamSection.team.c_occupation",
      "c_teamSection.team.emails",
      "c_teamSection.team.websiteUrl",
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
  alternateLanguageFields: ["name", "slug"],
};

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
      c_reviewsSection: {
        ...data.document.c_reviewsSection,
        ...(_site.c_reviewsAPIKey && {
          reviews: await fetchReviews(_site.c_reviewsAPIKey),
        }),
      },
      dm_directoryParents: dm_directoryParents,
    },
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
  return (
    <Main data={data}>
      <EntityLayout data={data} />
    </Main>
  );
};

export default Index;
