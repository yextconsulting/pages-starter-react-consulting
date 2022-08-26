import { Address, Coordinate, CTA, Hours, Image, ComplexImage, WebsiteUrl } from "@yext/types"

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
		links?: CTA[]
	}
}

export interface ProductProfile extends BaseProfile {
	name: string
	primaryPhoto: ComplexImage
	richTextDescription: string
	c_primaryCTA: CTA
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
	name: string
	address: Address
	geocodedCoordinate: Coordinate
	slug: string
	hours?: Hours
	additionalHoursText?: string
	mainPhone?: string
	tollFreePhone?: string
	description?: string
	emails?: string[]
	services: string[]
	logo?: Image
	// Add custom fields here
	// c_myStringField: string
	c_featuredProducts: {
		title: string
		products: ProductProfile[]
  }
	c_team?: financialProfessional[]
	c_hero?: {
		background: Image,
		cta1: CTA,
		cta2: CTA
	}
	c_promo?: {
		title?: string
		description?: string
		image?: Image
		cta?: CTA
		googlePlayUrl?: string
		appStoreUrl?: string
	}
	_site: SiteProfile
}

export type DirectoryProfile<T> = BaseProfile & {
	name: string
	dm_directoryChildrenCount: number
	dm_directoryChildren?: T[]
	dm_directoryParents?: DirectoryProfile<DirectoryProfile<T>>[]
	slug: string
}

export interface FAQItem {
	question: string;
	answer: string;
}
