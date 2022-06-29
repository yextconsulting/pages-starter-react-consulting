export type Review = {
  ratingValue?: string,
  bestRating?: string,
  author?: string,
};

export type AggregateRating = {
  ratingValue?: string,
  reviewCount?: string,
}

export const Review = (review?: Review) => {
  return review && {
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue,
        "bestRating": review.bestRating,
      },
      "author": {
        "@type": "Person",
        "name": review.author,
      }
    }
  };
}

export const AggregateRating = (rating?: AggregateRating) => {
  return rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.ratingValue,
      "reviewCount": rating.reviewCount,
    },
  };
}
