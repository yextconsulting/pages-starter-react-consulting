import type {
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
} from "@yext/pages";
import { getRuntime } from "@yext/pages/util";
import * as fourOhFour from "@yext/components-404";
import { isProduction } from "@yext/pages/util";
import { Link } from "@yext/sites-components";
import { getSearchProvider } from "src/config";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { SearchBar, StandardFacets } from "@yext/search-ui-react";
import "src/index.css";

export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "static",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `static.html`;
};

const FourOhFourTemplate = (data: TemplateRenderProps) => {
  const { document } = data;
  const { _site } = document;

  const searcher = getSearchProvider(
    "8f751e1911015807021396346fde0e0c",
    document.meta.locale,
    document.siteDomain
  );

  return (
    <div>
      <SearchHeadlessProvider searcher={searcher}>
        <SearchBar />
        <StandardFacets />
      </SearchHeadlessProvider>
    </div>
  );
};

export default FourOhFourTemplate;
