import { getRuntime } from "@yext/pages/util";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import Locator from "src/components/search/Locator";
import { getSearchProvider } from "src/config";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { Template } from "@yext/pages";
import "src/index.css";
import { Main } from "src/layouts/main";

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
