import type { ListingType } from "@yext/pages/components"
import type { Address, Coordinate, CTA, Hours, Image, ComplexImage, WebsiteUrl } from "@yext/types"

// TODO: potentially move this to @yext/types
// Also we should probably move @yext/types into @yext/pages
// since they're specific to pages streams, not generic kg types
interface BaseProfile {
	id: string
	businessId: number
	locale: string
	siteDomain: string
	siteId: number
	siteInternalHostname: string
	uid: number
	meta: {
		entityType: {
			id: string
			uid: number
		}
		locale: string
	}
	_site: SiteProfile
}

export interface SiteProfile {
	id: string
	name: string
	c_copyrightMessage?: string
	c_facebook?: string
	c_instagram?: string
	c_youtube?: string
	c_twitter?: string
	c_linkedIn?: string
	c_footerLinks?: CTA[]
	c_header?: {
		logo?: Image
		logoLink?: string
		links?: CTA[]
	}
}

export interface ProductProfile extends BaseProfile {
	name: string
	primaryPhoto: ComplexImage
	richTextDescription: string
	c_primaryCTA: CTA
}

export interface EventDate {
	end: string
	start: string
}

export interface EventProfile extends BaseProfile {
	name: string
  time: EventDate
  description: string
  c_primaryCTA: CTA
  photoGallery: ComplexImage[]
}

export interface financialProfessional {
	id: string;
	name: string;
	headshot?: Image;
	mainPhone?: string;
	c_occupation?: string;
	emails?: string[];
	websiteUrl?: WebsiteUrl;
}

// TODO: generate these automatically from stream definitions
export interface LocationProfile extends BaseProfile {
	readonly name: string
	readonly address: Address
	readonly geocodedCoordinate: Coordinate
	readonly slug: string
	readonly hours?: Hours
	readonly additionalHoursText?: string
	readonly mainPhone?: string
	readonly tollFreePhone?: string
	readonly description?: string
	readonly emails?: string[]
	readonly services: string[]
	readonly photoGallery: ComplexImage[]
	readonly googlePlaceId?: string
	readonly ref_listings?: ListingType[]
	readonly logo?: Image
	// Add custom fields here
	// c_myStringField: string
	readonly c_eventsSection?: {
		readonly title?: string
		readonly events?: EventProfile[]
	}
	c_bannerSection?: {
		readonly text?: string
		readonly image?: Image
	}
	readonly c_heroSection?: {
		readonly background?: Image
		readonly cta1?: CTA
		readonly cta2?: CTA
	}
	readonly c_featuredProductsSection?: {
		readonly title?: string
		readonly products?: ProductProfile[]
	}
	readonly c_promoSection?: {
		readonly title?: string
		readonly description?: string
		readonly image?: Image
		readonly cta?: CTA
		readonly googlePlayUrl?: string
		readonly appStoreUrl?: string
	}
	readonly c_gallerySection?: {
		readonly title?: string
		readonly images?: Image[]
	}
	readonly c_aboutSection?: {
		readonly title?: string
		readonly description?: string
		readonly image?: Image
		readonly cta?: CTA
	}
	readonly c_teamSection?: {
		readonly title?: string
		readonly team?: financialProfessional[]
	}
	readonly c_faqSection?: {
		readonly title?: string
		readonly faqs?: FAQItem[]
	},
	readonly c_nearbySection?: {
		readonly title?: string
		readonly linkToLocator?: boolean
		readonly cta?: CTA
	}
}

export type DirectoryProfile<T> = BaseProfile & {
	name: string
	c_brand: string
	dm_directoryChildrenCount: number
	dm_directoryChildren?: T[]
	dm_directoryParents?: DirectoryProfile<DirectoryProfile<T>>[]
	slug: string
}

export interface FAQItem {
	question: string;
	answer: string;
}
