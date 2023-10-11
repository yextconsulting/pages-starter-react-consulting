import {
  TemplateProps as InternalTemplateProps,
  TemplateRenderProps as InternalTemplateRenderProps,
} from "@yext/pages/*";
import type { ListingType } from "@yext/sites-components";
import type {
  Address,
  Coordinate,
  CTA,
  Hours,
  Image,
  ComplexImage,
  WebsiteUrl,
} from "@yext/types";
import type { Resource } from "i18next";

// TODO: potentially move this to @yext/types
// Also we should probably move @yext/types into @yext/pages
// since they're specific to pages streams, not generic kg types
interface BaseProfile {
  readonly id: string;
  readonly businessId: number;
  readonly locale: string;
  readonly siteDomain: string;
  readonly siteId: number;
  readonly siteInternalHostname: string;
  readonly uid: number;
  readonly meta: {
    readonly entityType: {
      readonly id: string;
      readonly uid: number;
    };
    readonly locale: string;
  };
  readonly _site: SiteProfile;
}

export interface SiteProfile extends BaseProfile {
  readonly name: string;
  readonly c_brand?: string;
  readonly c_copyrightMessage?: string;
  readonly c_facebook?: string;
  readonly c_instagram?: string;
  readonly c_youtube?: string;
  readonly c_twitter?: string;
  readonly c_linkedIn?: string;
  readonly c_footerLinks?: CTA[];
  readonly c_header?: {
    readonly logo?: Image;
    readonly logoLink?: string;
    readonly links?: CTA[];
  };
  readonly c_nearbySectionAPIKey?: string;
  readonly c_searchExperienceAPIKey?: string;
  readonly c_reviewsAPIKey?: string;
  readonly c_searchPage?: {
    readonly slug?: string;
  };
}

export interface ProductProfile extends BaseProfile {
  readonly name: string;
  readonly primaryPhoto: ComplexImage;
  readonly richTextDescription: string;
  readonly c_primaryCTA: CTA;
}

export interface SearchPageProfile extends BaseProfile {
  readonly slug: string;
  readonly c_searchTitle?: string;
  readonly c_searchSubTitle?: string;
  readonly c_searchPlaceholderText?: string;
}

export interface EventDate {
  readonly end: string;
  readonly start: string;
}

export interface EventProfile extends BaseProfile {
  readonly name: string;
  readonly time: EventDate;
  readonly description?: string;
  readonly c_primaryCTA?: CTA;
  readonly photoGallery?: ComplexImage[];
}

export interface FinancialProfessionalProfile extends BaseProfile {
  readonly id: string;
  readonly name: string;
  readonly headshot?: Image;
  readonly mainPhone?: string;
  readonly c_occupation?: string;
  readonly emails?: string[];
  readonly websiteUrl?: WebsiteUrl;
}

interface Insight {
  readonly title: string;
  readonly category?: string;
  readonly photo?: Image;
  readonly date?: string;
  readonly descriptionLong: string;
  readonly descriptionShort?: string;
  readonly cta: CTA;
}

// TODO: generate these automatically from stream definitions
export interface LocationProfile extends BaseProfile {
  readonly name: string;
  readonly address: Address;
  readonly yextDisplayCoordinate: Coordinate;
  readonly slug: string;
  readonly hours?: Hours;
  readonly additionalHoursText?: string;
  readonly mainPhone?: string;
  readonly fax?: string;
  readonly tollFreePhone?: string;
  readonly mobilePhone?: string;
  readonly ttyPhone?: string;
  readonly localPhone?: string;
  readonly alternatePhone?: string;
  readonly description?: string;
  readonly emails?: string[];
  readonly services: string[];
  readonly photoGallery: ComplexImage[];
  readonly googlePlaceId?: string;
  readonly ref_listings?: ListingType[];
  readonly logo?: Image;
  readonly paymentOptions?: string;

  // Add custom fields here
  // c_myStringField: string
  readonly c_eventsSection?: {
    readonly title?: string;
    readonly events?: EventProfile[];
  };
  readonly c_bannerSection?: {
    readonly text?: string;
    readonly image?: Image;
  };
  readonly c_heroSection?: {
    readonly background?: Image;
    readonly cta1?: CTA;
    readonly cta2?: CTA;
  };
  readonly c_featuredProductsSection?: {
    readonly title?: string;
    readonly products?: ProductProfile[];
  };
  readonly c_promoSection?: {
    readonly title?: string;
    readonly description?: string;
    readonly image?: Image;
    readonly cta?: CTA;
    readonly googlePlayUrl?: string;
    readonly appStoreUrl?: string;
  };
  readonly c_gallerySection?: {
    readonly title?: string;
    readonly images?: Image[];
  };
  readonly c_aboutSection?: {
    readonly title?: string;
    readonly description?: string;
    readonly image?: Image;
    readonly cta?: CTA;
  };
  readonly c_teamSection?: {
    readonly title?: string;
    readonly team?: FinancialProfessionalProfile[];
  };
  readonly c_faqSection?: {
    readonly title?: string;
    readonly faqs?: FAQProfile[];
  };
  readonly c_nearbySection?: {
    readonly title?: string;
    readonly linkToLocator?: boolean;
    readonly cta?: CTA;
  };
  readonly c_insightsSection?: {
    readonly title?: string;
    readonly cta?: CTA;
    readonly insights?: Insight[];
  };
  readonly c_reviewsSection?: {
    readonly title?: string;
    readonly reviews?: ReviewProfile[];
  };
  readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
}

export type DirectoryProfile<T> = BaseProfile & {
  readonly name: string;
  readonly dm_baseEntityCount: number;
  readonly dm_directoryChildren?: T[];
  readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
  readonly slug: string;
};

export interface FAQProfile extends BaseProfile {
  readonly question: string;
  readonly answer: string;
}

export interface ReviewProfile {
  apiIdentifier: string;
  authorName: string;
  comments?: {
    authorName: string;
    commentDate: string;
    commentId: number;
    content: string;
  }[];
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
}

export type TemplateProps<T = Record<string, unknown>> = Omit<
  InternalTemplateProps,
  "document"
> & {
  document: T;
};
export type TemplateRenderProps<T = Record<string, unknown>> = Omit<
  InternalTemplateRenderProps,
  "document"
> &
  TemplateProps<T> & {
    translations?: Resource;
  };

// The data returned by liveAPI has a slightly different meta property.
export type LiveAPIProfile<T = Record<string, unknown>> = Omit<T, "meta"> & {
  meta: {
    entityType: string;
    id: string;
    uid: string;
  };
};

export type ReviewStreamsResponse = {
  meta: {
    uuid: string;
    errors: {
      code: number;
      type: string;
      message: string;
    }[];
  };
  response: {
    count: number;
    docs: ReviewProfile[];
  };
};
