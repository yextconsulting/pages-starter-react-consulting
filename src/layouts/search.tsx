import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import { getRuntime } from "@yext/pages/util";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { getSearchProvider } from "src/config";
import Locator from "src/components/search/Locator";
import { useEffect, useState } from "react";

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
    document.meta.locale
  );

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) setFirstRender(false);
  }, [firstRender]);

  if (!_site.c_searchExperienceAPIKey) {
    console.error("Add the search experience API key to the Site Entity");
  }

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        {runtime.name === "browser" && !firstRender && (
          <BrowserRouter>
            <Locator
              title={c_searchTitle}
              subTitle={c_searchSubTitle}
              placeholderText={c_searchPlaceholderText}
            />
          </BrowserRouter>
        )}
      </SearchHeadlessProvider>
    </>
  );
};

export default SearchLayout;
