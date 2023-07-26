import { useMemo, useState } from "react";
import { useSearchState } from "@yext/search-headless-react";
import type { State } from "@yext/search-headless-react";
import { LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { useTranslations } from "src/common/useTranslations";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import { useLocator } from "./utils/useLocator";

const ResultSummary = () => {
  const searchState = useSearchState((state) => state);
  const { relativePrefixToRoot } = useTemplateData();
  const translate = useTranslations();
  const [searchMade, setSearchMade] = useState(false);
  const { results } = useLocator();
  const resultsText = useMemo(
    () => getResultsCountText(searchState, results.length),
    [searchState, results.length]
  );

  // Element to render for results summary when page is first loaded before a search is made.
  const initialSummaryText = (
    <span>
      {translate(
        "Use our locator to find a location near you or {BROWSE_DIRECTORY}.",
        {
          BROWSE_DIRECTORY: (
            <a
              href={relativePrefixToRoot + "index.html"}
              className="Link--underline"
            >
              {translate("browse our directory")}
            </a>
          ),
        }
      )}
    </span>
  );

  // Check if a search has been made in order to conditionally render initialSummaryText.
  if (
    !searchMade &&
    searchState.query.queryId &&
    !searchState.searchStatus.isLoading
  ) {
    setSearchMade(true);
  }

  return (
    <div className="mr-4">{searchMade ? resultsText : initialSummaryText}</div>
  );
};

function getResultsCountText(state: State, resultsCount: number) {
  const translate = useTranslations();
  let searchPlace = "";

  if (state.filters.static?.length) {
    // Make sure to get the match to the correct filter in case multiple are set.
    const activeFilter =
      state.filters.static.find(
        (f) =>
          f.selected &&
          f.filter.kind === "fieldValue" &&
          // If the locator is searching on "builtin.location", check if the selected filter is also a location filter.
          // Otherwise just match the locator filter fieldId to the selected filter fieldId.
          (LOCATOR_STATIC_FILTER_FIELD === "builtin.location"
            ? checkIsLocationFilter(f.filter)
            : LOCATOR_STATIC_FILTER_FIELD === f.filter.fieldId) &&
          f.displayName
      ) ?? null;
    if (activeFilter?.displayName) {
      searchPlace = activeFilter.displayName;
    }
  }

  if (searchPlace) {
    if (resultsCount === 0) {
      return translate("No locations found near {SEARCH_PLACE}.", {
        SEARCH_PLACE: searchPlace,
      });
    }
    if (resultsCount === 1) {
      return translate("1 location found near {SEARCH_PLACE}.", {
        SEARCH_PLACE: searchPlace,
      });
    }
    return translate("{RESULTS_COUNT} locations found near {SEARCH_PLACE}.", {
      RESULTS_COUNT: resultsCount,
      SEARCH_PLACE: searchPlace,
    });
  }

  if (resultsCount === 0) {
    return translate("No locations found.");
  }
  if (resultsCount === 1) {
    return translate("1 location found.");
  }
  return translate("{RESULTS_COUNT} locations found.", {
    RESULTS_COUNT: resultsCount,
  });
}

export default ResultSummary;
