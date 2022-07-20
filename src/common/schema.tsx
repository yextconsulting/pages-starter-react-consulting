import { SchemaWrapper, LocalBusiness } from "@yext/schema-wrapper";

export function SchemaBuilder(data: any) {
  const json = {
    ...LocalBusiness(data),
    paymentAccepted: data.document.paymentOptions,
    makesOffer: data.document.services,
  }
  return SchemaWrapper(json);
}
