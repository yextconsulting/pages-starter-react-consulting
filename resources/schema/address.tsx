export type Address = { // reused in other components too, maybe have this type in somewhere central
    line1: string;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string;
  };
  
  export type Location = {
    name?: string,
    address?: Address,
  }
  
  export const Address = (address?: Address) => {
    return address && {
      address: {
        "@type": "PostalAddress",
        "streetAddress": address.line1,
        "addressLocality": address.city,
        "addressRegion": address.region,
        "postalCode": address.postalCode,
        "addressCountry": address.countryCode,
      }
    };
  }
  
  export const Location = (location?: Location) => {
    return location && {
      "@type": "Place",
      "name": location.name,
      ...Address(location.address),
    };
  }