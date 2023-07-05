import { useEffect, useRef } from "react";
import classNames from "classnames";
import type { CardComponent } from "@yext/search-ui-react";
import type { Result } from "@yext/search-headless-react";
import { useLocator } from "src/components/search/utils/useLocator";
import type { LocatorCardProps } from "src/components/cards/LocatorCard";
import "src/components/search/ResultList.css";
import { LocationProfile } from "src/types/entities";

interface ResultListProps extends LocatorCardProps {
  CardComponent: CardComponent<LocationProfile>;
}

const ResultList = (props: ResultListProps) => {
  const { CardComponent } = props;

  const { results } = useLocator();

  return (
    <div className="ResultList">
      {results?.map((result) => (
        <ResultListItem
          key={result.id || result.index}
          CardComponent={CardComponent}
          result={result}
        />
      ))}
    </div>
  );
};

interface ResultListItemProps {
  CardComponent: CardComponent<LocationProfile>;
  result: Result<LocationProfile>;
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
  } = useLocator();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  // When the selectedId is updated from a marker click scroll the ResultList to show the current LocatorCard
  useEffect(() => {
    if (selectedId === result.id) {
      listItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId, result.id]);

  return (
    <div
      ref={listItemRef}
      className={classNames(
        "ResultList-item",
        { "is-selected": selectedId === result.id },
        { "is-hovered": hoveredId === result.id || focusedId === result.id }
      )}
      onClick={() => setSelectedId(result.id ?? "")}
      onFocus={() => setFocusedId(result.id ?? "")}
      onBlur={() => setFocusedId("")}
      onMouseEnter={() => setHoveredId(result.id ?? "")}
      onMouseLeave={() => setHoveredId("")}
    >
      <CardComponent result={result} />
    </div>
  );
}

export default ResultList;
