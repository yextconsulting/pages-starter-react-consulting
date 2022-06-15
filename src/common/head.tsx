import { Data, HeadConfig, Tag } from "@yext/yext-sites-scripts";

const dnsPrefetchTags: Tag[] = [
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//www.yext-pixel.com"}},
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//a.cdnmktg.com"}},
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//a.mktgcdn.com"}},
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//dynl.mktgcdn.com"}},
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//dynm.mktgcdn.com"}},
	{type: "meta", attributes: {rel: "dns-prefetch", href: "//www.google-analytics.com"}},
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

export function defaultHeadConfig(data: Data, additionalTags?: Tag[]): HeadConfig {
	const logoTags: Tag[] = data.document?.streamOutput?.logo
		? [
			{
        type: "meta",
        attributes: {
          property: "og:image",
          content: data.document.streamOutput.logo,
        }
			}
		]
		: [];

	const geoTags: Tag[] = data.document?.streamOutput?.yextDisplayCoordinate
		? [
			{
        type: "meta",
        attributes: {
          name: "geo.position",
          content: `${data.document.streamOutput.yextDisplayCoordinate.lat},${data.document.streamOutput.yextDisplayCoordinate.long}`,
        }
			}
		]
		: [];
	const addressTags: Tag[] = data.document.streamOutput.address
		? [
			{
        type: "meta",
        attributes: {
          name: "geo.placename",
          content: `${data.document.streamOutput.address.city},${data.document.streamOutput.address.region}`, // TODO: dono't use abbreviated form here when it's available
        }
			},
			{
        type: "meta",
        attributes: {
          name: "geo.region",
          content: `${data.document.streamOutput.address.countryCode}-${data.document.streamOutput.address.region}`,
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
  };
}

function metaTitle(data: Data): string {
	// 1. Check for meta field on the entity
	let { c_meta: entityMeta } = data.document.streamOutput;
	if (entityMeta && entityMeta.title) return entityMeta.title;

	// 2. Check for meta field on the site entity
	//    resolve any field embeddings
	let { c_meta: siteMeta } = data.document.streamOutput;
	if (siteMeta && siteMeta.title) return hydrateEmbeddedFields(siteMeta.title, data);

	return ""
}

function metaDescription(data: Data): string {
	// 1. Check for meta field on the entity
	let { c_meta: entityMeta } = data.document.streamOutput;
	if (entityMeta && entityMeta.description) return entityMeta.description;

	// 2. Check for meta field on the site entity
	//    resolve any field embeddings
	let { c_meta: siteMeta } = data.document.streamOutput;
	if (siteMeta && siteMeta.description) return hydrateEmbeddedFields(siteMeta.description, data);

	// 3. Check for breadcrumbs
	let { dm_directoryParents } = data.document.streamOutput;
	if (dm_directoryParents) {
		return `${dm_directoryParents.map((crumb: {name: string}) => crumb.name).join(', ')}.`
	}

	return ""
}

function hydrateEmbeddedFields(template: string, data: Data) {
	return template.replace(/\[\[([a-zA-Z0-9_\-\.]*)\]\]/g, (_, fieldName) => getFieldAsString(data.document.streamOutput, fieldName.split(".")))
}

function getFieldAsString(data: any, path: string[]): string {
	if (!data) return "";
	const nextSelector = path[0];
	if (path.length === 1) return data[nextSelector] || '';
	return getFieldAsString(data[nextSelector], path.slice(1))
}
