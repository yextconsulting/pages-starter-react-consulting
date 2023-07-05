import {
  Template,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import { Main } from "src/layouts/main";
import SearchLayout from "src/layouts/search";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { SEARCH_PATH } from "src/config";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "search-page",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_searchTitle",
      "c_searchSubTitle",
      "c_searchPlaceholderText",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["search-page"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
  alternateLanguageFields: ["name", "slug"],
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath = (): string => {
  return SEARCH_PATH;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document"s <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<SearchPageProfile>
> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

/**
 * This is the main template. It can have any name as long as it"s the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Search: Template<TemplateRenderProps<SearchPageProfile>> = (data) => {
  return (
    <Main data={data}>
      <SearchLayout data={data} />
    </Main>
  );
};

export default Search;
