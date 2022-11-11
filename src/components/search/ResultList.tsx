import { useEffect, useRef } from "react";
import classNames from "classnames";
import { useSearchState } from "@yext/search-headless-react";
import type { CardComponent } from "@yext/search-ui-react";
import type { Result } from "@yext/search-headless-react";
import { useLocatorContext } from "src/components/search/Locator";
import type { LocatorCardProps } from "src/components/cards/LocatorCard";
import "src/components/search/ResultList.css";

interface ResultListProps extends LocatorCardProps {
  CardComponent: CardComponent,
  displayAllOnNoResults?: boolean,
}

export default function ResultList(props: ResultListProps) {
  const { CardComponent, displayAllOnNoResults } = props;

  const verticalResults = useSearchState(state => state.vertical.results) || [];
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  let results = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }

  return (
    <div className="ResultList">
      {results?.map(result => (
        <ResultListItem
          key={ result.id || result.index }
          CardComponent={ CardComponent }
          result={ result }
        />
      ))}
    </div>
  )
}

interface ResultListItemProps {
  CardComponent: CardComponent,
  result: Result,
}

function ResultListItem(props: ResultListItemProps) {
  const { CardComponent, result } = props;
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  }  = useLocatorContext();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  // When the selectedId is updated from a marker click scroll the ResultList to show the current LocatorCard
  useEffect(() => {
    if (selectedId === result.id) {
      listItemRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest"});
    }
  }, [selectedId, result.id]);

  return (
    <div
      ref={ listItemRef }
      className={
        classNames(
          "ResultList-item",
          { "is-selected": selectedId === result.id },
          { "is-hovered": hoveredId === result.id || focusedId === result.id })
      }
      onClick={ () => setSelectedId(result.id ?? "" ) }
      onFocus={ () => setFocusedId(result.id ?? "") }
      onBlur={ () => setFocusedId("") }
      onMouseEnter={ () => setHoveredId(result.id ?? "") }
      onMouseLeave={ () => setHoveredId("") }
    >
      <CardComponent result={ result } />
    </div>
  )
}
