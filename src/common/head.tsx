import { TemplateRenderProps, HeadConfig, Tag } from "@yext/pages";
import { SchemaBuilder } from 'src/common/schema';

const dnsPrefetchTags: Tag[] = [
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//www.yext-pixel.com" } },
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//a.cdnmktg.com" } },
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//a.mktgcdn.com" } },
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//dynl.mktgcdn.com" } },
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//dynm.mktgcdn.com" } },
	{ type: "meta", attributes: { rel: "dns-prefetch", href: "//www.google-analytics.com" } },
]

const defaultHeadTags: Tag[] = [
	{
		type: "meta",
		attributes: {
			"http-equiv": "X-UA-Compatible",
			content: "IE=edge"
		}
	},
	...dnsPrefetchTags,
	{
		type: "meta",
		attributes: {
			name: "format-detection",
			content: "telephone=no"
		},
	},
	{
		type: "meta",
		attributes: {
			property: "og:type",
			content: "website"
		},
	},
	{
		type: "meta",
		attributes: {
			property: "og:url",
			content: "" // TODO: update when siteDomain is available - https://yextops.slack.com/archives/C02LLE9BW2K/p1655239903694849
		},
	},
	{
		type: "meta",
		attributes: {
			property: "twitter:card",
			content: "summary"
		},
	},
	{
		type: "link",
		attributes: {
			rel: "canonical",
			href: "" // TODO: update when siteDomain is available - https://yextops.slack.com/archives/C02LLE9BW2K/p1655239903694849
		},
	},
	// TODO: alternate language links - we don't have this data yet
]

export function defaultHeadConfig(data: TemplateRenderProps, additionalTags?: Tag[]): HeadConfig {
	const logoTags: Tag[] = data.document?.logo
		? [
			{
				type: "meta",
				attributes: {
					property: "og:image",
					content: data.document.logo,
				}
			}
		]
		: [];

	const geoTags: Tag[] = data.document?.yextDisplayCoordinate
		? [
			{
				type: "meta",
				attributes: {
					name: "geo.position",
					content: `${data.document.yextDisplayCoordinate.lat},${data.document.yextDisplayCoordinate.long}`,
				}
			}
		]
		: [];
	const addressTags: Tag[] = data.document.address
		? [
			{
				type: "meta",
				attributes: {
					name: "geo.placename",
					content: `${data.document.address.city},${data.document.address.region}`, // TODO: dono't use abbreviated form here when it's available
				}
			},
			{
				type: "meta",
				attributes: {
					name: "geo.region",
					content: `${data.document.address.countryCode}-${data.document.address.region}`,
				}
			}
		]
		: [];

	return {
		title: metaTitle(data),
		charset: "UTF-8",
		viewport: "width=device-width, initial-scale=1, maximum-scale=5",
		tags: [
			{
				type: "meta",
				attributes: {
					name: "description",
					content: metaDescription(data),
				}
			},
			{
				type: "meta",
				attributes: {
					property: "og:title",
					content: metaTitle(data),
				}
			},
			{
				type: "meta",
				attributes: {
					property: "og:description",
					content: metaDescription(data),
				}
			},
			...logoTags,
			...defaultHeadTags,
			...geoTags,
			...addressTags,
			...(additionalTags || [])
		],
		other: SchemaBuilder(data),
	};
}

function metaTitle(data: TemplateRenderProps): string {
	// 1. Check for meta field on the entity
	const { c_meta: entityMeta } = data.document;
	if (entityMeta && entityMeta.title) return entityMeta.title;

	return ""
}

function metaDescription(data: TemplateRenderProps): string {
	// 1. Check for meta field on the entity
	const { c_meta: entityMeta } = data.document;
	if (entityMeta && entityMeta.description) return entityMeta.description;

	// 2. Check for breadcrumbs
	const { dm_directoryParents } = data.document;
	if (dm_directoryParents) {
		return `${dm_directoryParents.map((crumb: { name: string }) => crumb.name).join(', ')}.`
	}

	return ""
}