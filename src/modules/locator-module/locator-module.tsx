import type { Module, ModuleConfig } from "@yext/pages/*";
import { getRuntime } from "@yext/pages/util";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { getModuleSearchProvider } from "src/config";
import Locator from "src/features/locator-module/Locator";
import "./index.css";

export const config: ModuleConfig = {
  name: "locator-module",
};

const searcher = getModuleSearchProvider(
  YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY,
  "en"
);

const LocatorModuleLayout = () => {
  if (!YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY) {
    console.error(
      "Add a search experience API key to the .env file or as a site variable to enable the locator."
    );
  }

  return (
    <Locator
      title="Find a Location"
      subTitle="Search by city and state or ZIP code"
      placeholderText="Search by city and state or ZIP code"
    />
  );
};

const LocatorModule: Module = () => {
  return (
    <div className="yext-tw">
      <SearchHeadlessProvider searcher={searcher}>
        {getRuntime().name === "browser" ? (
          <BrowserRouter>
            <LocatorModuleLayout />
          </BrowserRouter>
        ) : (
          <StaticRouter location="">
            <LocatorModuleLayout />
          </StaticRouter>
        )}
      </SearchHeadlessProvider>
    </div>
  );
};

export default LocatorModule;
