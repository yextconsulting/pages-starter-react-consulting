import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Locator from "src/components/search/Locator";
import { getSearchProvider } from "src/config";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { Template } from "@yext/pages";
import "src/index.css";
import { Main } from "src/layouts/main";
import { getRuntime } from "@yext/pages/util";
import LocatorRouter from "src/components/search/LocatorRouter";
import { defaultLocatorRouter } from "src/components/search/router";

interface SearchLayoutProps {
  data: TemplateRenderProps<SearchPageProfile>;
}

const SearchLayout = ({ data }: SearchLayoutProps) => {
  const { document } = data;
  const { c_searchTitle, c_searchSubTitle, c_searchPlaceholderText, _site } =
    document;

  const searcher = getSearchProvider(
    YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY,
    document.meta.locale,
    document.siteDomain
  );

  if (!YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY) {
    console.error(
      "Add a search experience API key to the .env file or as a site variable to enable the Locator component."
    );
  }

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <LocatorRouter router={defaultLocatorRouter}>
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
      </LocatorRouter>
    </SearchHeadlessProvider>
  );
};

/**
 * This is the main template. It can have any name as long as it"s the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Search: Template<TemplateRenderProps<SearchPageProfile>> = (data) => {
  const runtime = getRuntime();

  return (
    <Main data={data}>
      {runtime.name === "browser" ? (
        <BrowserRouter>
          <SearchLayout data={data} />
        </BrowserRouter>
      ) : (
        <StaticRouter location="">
          <SearchLayout data={data} />
        </StaticRouter>
      )}
    </Main>
  );
};

export default Search;
