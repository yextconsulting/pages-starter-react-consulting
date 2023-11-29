import { Stream, TemplateConfig } from "@yext/pages";

/**
 * Not required depending on your use case.
 */
export const configBuilder: (
  id?: string,
  filter?: Stream["filter"]
) => TemplateConfig = (id?: string, filter?: Stream["filter"]) => ({
  stream: {
    $id: id || "search-page",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_searchTitle",
      "c_searchSubTitle",
      "c_searchPlaceholderText",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: filter || {
      entityIds: ["search-page"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
  },
});
