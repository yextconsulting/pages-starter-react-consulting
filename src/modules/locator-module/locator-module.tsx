import type { Module, ModuleConfig } from "@yext/pages/*";
import { getRuntime } from "@yext/pages/util";
import {
  CloudRegion,
  Environment,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { AnalyticsProvider as SearchAnalyticsProvider } from "@yext/search-ui-react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { useTemplateData } from "src/common/useTemplateData";
import { getSearchProvider } from "src/config";
import Locator from "src/components/search/Locator";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import "./index.css";

export const config: ModuleConfig = {
  name: "locator-module",
};

const LocatorModuleLayout = () => {
  const { document } =
    useTemplateData() as TemplateRenderProps<SearchPageProfile>;
  const searcher = getSearchProvider(
    YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY,
    document.meta.locale,
    document.siteDomain
  );

  if (!YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY) {
    console.error(
      "Add a search experience API key to the .env file or as a site variable to enable the locator."
    );
  }

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <Locator
        title={document.c_searchTitle || "Find a Location"}
        subTitle={
          document.c_searchSubTitle || "Search by city and state or ZIP code"
        }
        placeholderText={
          document.c_searchPlaceholderText ||
          "Search by city and state or ZIP code"
        }
      />
    </SearchHeadlessProvider>
  );
};

const LocatorModule: Module = () => {
  const runtime = getRuntime();

  return (
    <div className="locatorModule">
      <SearchAnalyticsProvider
        apiKey={YEXT_PUBLIC_ANALYTICS_API_KEY}
        requireOptIn={false}
        cloudRegion={CloudRegion.US}
        environment={Environment.PROD}
      >
        {runtime.name === "browser" ? (
          <BrowserRouter>
            <LocatorModuleLayout />
          </BrowserRouter>
        ) : (
          <StaticRouter location="">
            <LocatorModuleLayout />
          </StaticRouter>
        )}
      </SearchAnalyticsProvider>
    </div>
  );
};

export default LocatorModule;
