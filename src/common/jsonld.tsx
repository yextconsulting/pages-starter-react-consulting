import { OpeningHours } from '../../resources/schema/hours';
import { PhotoGallery } from '../../resources/schema/photoGallery';
import { Address, Location } from '../../resources/schema/address';
import { Review, AggregateRating } from '../../resources/schema/review';
import { Offer } from '../../resources/schema/offers';
import { Performer, Organization } from '../../resources/schema/people';

// Main wrapper of all JSON-LD schema that is injected into the head script
export const SchemaWrapper = (data: any) => {
  let json = {
    ...LocalBusiness(data), // replace this to Product, Event or other component if needed
    // Additional Fields
    paymentAccepted: data.document.paymentOptions,
    makesOffer: data.document.services,
  }

  return `<script type="application/ld+json">
  ${JSON.stringify(json)}
  </script>`;
}

const BaseSchema = (data: any, schemaType: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: data.document.name,
  }
}

// LocalBusiness includes sub-LocalBusiness schema types, including:
// FinancialService, TravelAgency, GovernmentOffice, ShoppingCenter, MedicalBusiness etc
// pass different variables to the schemaType param if neededed
// more sub-types see https://schema.org/LocalBusiness
const LocalBusiness = (data: any, schemaType?: string) => {
  return {
    ...BaseSchema(data, schemaType ?? "LocalBusiness"), // default, if schemaType is nil, set to LocalBusiness
    ...Address(data.document.address),
    ...OpeningHours(data.document.hours),
    ...PhotoGallery(data.document.photoGallery),
    description: data.document.description,
    telephone: data.document.mainPhone,
    email: data.document.email,
  }
}

// https://schema.org/Product
// Make sure to double check if the fields are correct for your site
const Product = (data: any, schemaType?: string) => {
  return {
    ...BaseSchema(data, schemaType ?? "Product"),
    ...PhotoGallery(data.document.photoGallery),
    ...Review(data.document.c_reviews),
    ...AggregateRating(data.document.c_aggregateRating),
    ...Offer({
      url: "",
      priceCurrency: data.document.c_currency,
      price: data.document.price,
      priceValidUntil: data.document.expirationDate,
      itemCondition: data.document.stockStatus,
      availability: data.document.availabilityDate,
    }),
    description: data.document.description,
    sku: data.document.sku,
    mpn: data.document.mpn,
    brand: {
      "@type": "Brand",
      "name": data.document.brand,
    },
  }
}

// https://schema.org/Event
// Make sure to double check if the fields are correct for your site
const Event = (data: any, schemaType?: string) => {
  return {
    ...BaseSchema(data, schemaType ?? "Event"),
    ...PhotoGallery(data.document.photoGallery),
    ...Location({
      name: data.document.geomodifier,
      address: data.document.address,
    }),
    startDate: data.document.c_startDate,
    endDate: data.document.c_endDate,
    description: data.document.description,
    eventAttendanceMode: data.document.attendance,
    eventStatus: data.document.eventStatus,
    ...Performer(data.document.performers),
    ...Organization({
      name: data.document.organizerName,
    }),
    ...Offer({
      url: "",
      priceCurrency: data.document.c_currency,
      price: data.document.price,
      priceValidUntil: data.document.expirationDate,
      itemCondition: data.document.stockStatus,
      availability: data.document.availabilityDate,
    }),
  }
}
