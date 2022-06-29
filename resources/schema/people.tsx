export type Performer = Array<string>
export type Organization = {
  name?: string,
  url?: string,
}

export const Performer = (performers?: Performer) => {
  return performers && {
    "performer": {
      "@type": "PerformingGroup",
      "name": performers.join(" and "),
    },
  };
}

export const Organization = (org?: Organization) => {
  return org && {
    "organizer": {
      "@type": "Organization",
      "name": org.name,
      "url": org.url,
    }
  };
}
