import { useEffect, useRef } from "react";
import type { Result } from "@yext/search-headless-react";
import type { CardComponent } from "@yext/search-ui-react";
import classNames from "classnames";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { LocationProfile } from "src/types/entities";
import type { LocatorCardProps } from "./LocatorCard";
import "./ResultList.css";
import { useLocator } from "./useLocator";

interface ResultListProps extends LocatorCardProps {
  CardComponent: CardComponent<LocationProfile>;
}

const ResultList = (props: ResultListProps) => {
  return (
    <ErrorBoundaryWithAnalytics name="resultlist" noAnalyticsScope={true}>
      <ResultListInternal {...props} />
    </ErrorBoundaryWithAnalytics>
  );
};

const ResultListInternal = ({ CardComponent }: ResultListProps) => {
  const { results } = useLocator();

  return (
    <ErrorBoundaryWithAnalytics name="resultlist" noAnalyticsScope={true}>
      <div className="ResultList">
        {results?.map((result) => (
          <ResultListItem
            CardComponent={CardComponent}
            key={result.id || result.index}
            result={result}
          />
        ))}
      </div>
    </ErrorBoundaryWithAnalytics>
  );
};

interface ResultListItemProps {
  CardComponent: CardComponent<LocationProfile>;
  result: Result<LocationProfile>;
}

function ResultListItem({ CardComponent, result }: ResultListItemProps) {
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  } = useLocator();
  const listItemRef = useRef<HTMLDivElement | null>(null);

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
      onBlur={() => setFocusedId("")}
      onClick={() => setSelectedId(result.id ?? "")}
      onFocus={() => setFocusedId(result.id ?? "")}
      onMouseEnter={() => setHoveredId(result.id ?? "")}
      onMouseLeave={() => setHoveredId("")}
    >
      <CardComponent result={result} />
    </div>
  );
}

export default ResultList;
