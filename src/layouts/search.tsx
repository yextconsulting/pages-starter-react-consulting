import { getRuntime } from "@yext/pages/util";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import Locator from "src/components/search/Locator";
import { getSearchProvider } from "src/config";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import {
  TransformProps,
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Stream,
  Template,
  TemplateConfig,
} from "@yext/pages";
import { defaultHeadConfig } from "src/common/head";
import "src/index.css";
import { Main } from "src/layouts/main";
import { TemplateProps } from "src/types/entities";
import { getTranslations } from "src/i18n";

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

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<SearchPageProfile>> = (data) => {
  return data.document.slug;
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
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<SearchPageProfile>
> = async (data) => {
  const translations = await getTranslations(data.document.locale);

  return {
    ...data,
    translations,
  };
};

interface SearchLayoutProps {
  data: TemplateRenderProps<SearchPageProfile>;
}

const SearchLayout = ({ data }: SearchLayoutProps) => {
  const { document } = data;
  const { c_searchTitle, c_searchSubTitle, c_searchPlaceholderText, _site } =
    document;

  const runtime = getRuntime();
  const searcher = getSearchProvider(
    _site.c_searchExperienceAPIKey ?? "",
    document.meta.locale,
    document.siteDomain
  );

  if (!_site.c_searchExperienceAPIKey) {
    console.error("Add the search experience API key to the Site Entity");
  }

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        {runtime.name === "browser" && (
          <BrowserRouter>
            <Locator
              title={c_searchTitle || "Find a Location"}
              subTitle={
                c_searchSubTitle || "Search by city and state or ZIP code"
              }
              placeholderText={
                c_searchPlaceholderText ||
                "Search by city and state or ZIP code"
              }
            />
          </BrowserRouter>
        )}
      </SearchHeadlessProvider>
    </>
  );
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
