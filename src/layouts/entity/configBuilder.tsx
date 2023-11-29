import type { Stream, TemplateConfig } from "@yext/pages";
import { dedupeStreamFields } from "src/common/helpers";

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
