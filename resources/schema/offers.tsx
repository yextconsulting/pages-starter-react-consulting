export type Offer = {
  url?: string,
  priceCurrency?: string,
  price?: string,
  priceValidUntil?: string,
  itemCondition?: string,
  availability?: string,
};

export const Offer = (offer?: Offer) => {
  return offer && {
    "offers": {
      "@type": "Offer",
      "url": offer.url,
      "priceCurrency": offer.priceCurrency,
      "price": offer.price,
      "priceValidUntil": offer.priceValidUntil,
      "itemCondition": offer.itemCondition,
      "availability": offer.availability,
    }
  };
}
