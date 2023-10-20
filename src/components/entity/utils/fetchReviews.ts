import type { ReviewStreamsResponse } from "src/types/entities";
import { fetch } from "@yext/pages/util";

export const fetchReviews = async (api_key: string, entityId: string) => {
  const params = new URLSearchParams({
    api_key,
    v: "20221227",
    "entity.id": entityId,
  });

  // https://hitchhikers.yext.com/docs/streams/reviews-streams-reference/
  const data: ReviewStreamsResponse = await fetch(
    `https://streams.yext.com/v2/accounts/me/api/reviewsStreamsEndpoints_reviews?${params.toString()}`
  )
    .then((resp) => resp.json())
    .catch((error) => console.log(error));

  return data.response.docs;
};
