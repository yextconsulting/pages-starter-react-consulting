import { SchemaWrapper, LocalBusiness } from "@yext/schema-wrapper";
import type { TemplateRenderProps } from "src/types/entities";

export function SchemaBuilder(data: TemplateRenderProps) {
  const json = {
    ...LocalBusiness(data),
    paymentAccepted: data.document.paymentOptions,
    makesOffer: data.document.services,
  }
  return SchemaWrapper(json);
}
