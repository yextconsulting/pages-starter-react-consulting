import { SchemaWrapper, LocalBusiness, FAQPage } from "@yext/schema-wrapper";
import type { TemplateRenderProps } from "src/types/entities";

export function SchemaBuilder(
  data: TemplateRenderProps<Record<string, any>>
): string {
  const localBusiness = data.document.address
    ? {
        ...LocalBusiness(data),
        paymentAccepted: data.document.paymentOptions,
        makesOffer: data.document.services,
      }
    : null;

  const breadcrumbs = data.document.dm_directoryParents
    ? (
        data.document.dm_directoryParents as Array<{
          slug: string;
          name: string;
        }>
      ).map((parent, idx) => ({
        "@type": "ListItem",
        name: parent.name,
        position: idx + 1,
        item: {
          "@type": "Thing",
          "@id": data.relativePrefixToRoot + parent.slug,
        },
      }))
    : null;

  const faqs = data.document.c_faqSection?.faqs
    ? FAQPage(data.document.c_faqSection.faqs)
    : null;

  const json = {
    "@graph": [
      localBusiness && localBusiness,
      faqs && faqs,
      breadcrumbs && {
        "@context": "http://www.schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
    ],
  };

  return SchemaWrapper(json);
}
