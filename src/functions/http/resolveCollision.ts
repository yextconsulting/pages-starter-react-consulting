/**
 * This function is connected to a Data Update Failure notification for the site.
 * When the cause of a Data Update Failure is a "path conflict", this function
 * will mark the affected entity using c_isCollision to automatically resolve the collision.
 */

import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

type ContentEndpointResponse = {
  response: {
    docs: ContentEndpointEntity[];
    count: number;
  };
};

type ContentEndpointEntity = {
  id: string;
  c_isCollision?: boolean;
  meta: {
    entityType: {
      id: string;
    };
  };
};

export default async function resolveCollision(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  let requestBody = null;

  try {
    requestBody = JSON.parse(request.body);
  } catch (e) {
    return {
      body: "Invalid request.",
      headers: {},
      statusCode: 400,
    };
  }

  try {
    requestBody = JSON.parse(requestBody.body);
  } catch (e) {
    return {
      body: "Invalid request.",
      headers: {},
      statusCode: 400,
    };
  }

  //webhook should only execute for path conflict errors
  const isPathConflict = requestBody?.deploy?.error?.includes("path conflict");
  if (!isPathConflict) {
    return {
      body: "No action - not a path conflict.",
      headers: {},
      statusCode: 200,
    };
  }

  const entityId = requestBody.deploy?.entityId;

  //get external ID from internal ID
  const getExternalIdEndpoint = `https://cdn.yextapis.com/v2/accounts/me/content/internalToExternalID?v=20241111&api_key=${YEXT_PUBLIC_COLLISIONS_LOOKUP_API_KEY}&uid=${entityId}`;
  const result = await fetch(getExternalIdEndpoint);
  if (!result.ok) {
    return {
      body: `Failed to find entity with internal id ${entityId}.`,
      headers: {},
      statusCode: 500,
    };
  }
  const resultJson: ContentEndpointResponse = await result.json();
  const entity =
    resultJson?.response?.count > 0 ? resultJson.response.docs[0] : null;
  const externalId = entity ? entity.id : "";

  //use external ID to set c_isCollision to true
  if (externalId) {
    const updateEntityEndpoint = `https://api.yext.com/v2/accounts/me/entities/${externalId}?api_key=${YEXT_PUBLIC_COLLISIONS_WRITE_API_KEY}&v=20241111`;
    const headers = { "Content-Type": "application/json; charset=utf-8" };
    const req = new Request(updateEntityEndpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        c_isCollision: true,
      }),
    });
    const response = await fetch(req);
    if (!response.ok) {
      return {
        body: `Failed to update entity ${externalId}.`,
        headers: {},
        statusCode: 500,
      };
    } else {
      return {
        body: `Success: fixed collision for ${externalId}.`,
        headers: {},
        statusCode: 200,
      };
    }
  }
  return {
    body: `Could not find external ID. No action taken.`,
    headers: {},
    statusCode: 200,
  };
}
