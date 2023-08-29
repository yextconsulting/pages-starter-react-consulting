import { FacetsProvider } from "./FacetsProvider";
import { StandardFacetContent } from "./StandardFacetContent";
import { FacetProps, FacetsProps } from "./FacetProps";
import { isNumericalFacet, isStringFacet } from "./filterutils";
import { FilterDivider } from "./FilterDivider";
import { Fragment } from "react";
import { NumericalFacetContent } from "./NumericalFacetContent";
import { HierarchicalFacetContent } from "./HierarchicalFacetContent";
import { DisplayableFacet } from "@yext/search-headless-react";

enum FacetType {
  STANDARD = "STANDARD",
  NUMERICAL = "NUMERICAL",
  HIERARCHICAL = "HIERARCHICAL",
}

/**
 * A component that displays all facets applicable to the current vertical search.
 *
 * @remarks
 * This component is a quick way of getting facets on the page, and it will render standard facets,
 * numerical facets, and hierarchical facets. The {@link StandardFacet}, {@link NumericalFacet},
 * and {@link HierarchicalFacet} components can be used to override the default facet configuration.
 *
 * @param props - {@link FacetsProps}
 * @returns A React component for facets
 *
 * @public
 */
export function Facets(props: FacetsProps) {
  const {
    searchOnChange,
    onlyRenderChildren = false,
    children,
    hierarchicalFieldIds = [],
    excludedFieldIds = [],
    collapsible,
    showOptionCounts,
  } = props;

  const fieldIdToCustomFacetProps = new Map();
  const fieldIds: string[] = [];
  if (children) {
    (Array.isArray(children) ? children : [children])
      .filter((child) => child?.props?.fieldId)
      .forEach((child) => {
        fieldIdToCustomFacetProps.set(child.props.fieldId, child);
        fieldIds.push(child.props.fieldId);
      });
  }

  return (
    <div>
      <FacetsProvider searchOnChange={searchOnChange}>
        {(facets) => {
          if (!facets?.length) {
            return;
          }

          if (!onlyRenderChildren) {
            facets.forEach((facet) => {
              if (!fieldIds.includes(facet.fieldId)) {
                fieldIds.push(facet.fieldId);
              }
            });
          }

          const fieldIdToFacet = new Map();
          facets.forEach((facet) => fieldIdToFacet.set(facet.fieldId, facet));

          return fieldIds
            .filter(
              (fieldId) =>
                !excludedFieldIds.includes(fieldId) &&
                fieldIdToFacet.get(fieldId).options.length > 0 &&
                (!onlyRenderChildren || fieldIdToCustomFacetProps.has(fieldId))
            )
            .map((fieldId, i) => {
              const facet: DisplayableFacet = fieldIdToFacet.get(fieldId);

              return (
                <Fragment key={facet.fieldId}>
                  <Facet
                    facet={facet}
                    hierarchicalFieldIds={hierarchicalFieldIds}
                    collapsible={collapsible}
                    showOptionCounts={showOptionCounts}
                  />
                  {i < facets.length - 1 && <FilterDivider />}
                </Fragment>
              );
            });
        }}
      </FacetsProvider>
    </div>
  );
}

/**
 * A component that represents a single facet.
 *
 * @param facet - {@link DisplayableFacet}
 * @param facetsCustomCssClasses - {@link FacetsCssClasses}
 * @param fieldIdToCustomFacetProps - a map of fieldId to facet props
 * @param hierarchicalFieldIds - a list of hierarchical field ids
 * @returns {@link ReactElement}
 *
 * @internal
 */
export function Facet({
  facet,
  hierarchicalFieldIds,
  collapsible,
  showOptionCounts,
}: {
  facet: DisplayableFacet;
  hierarchicalFieldIds: string[];
  collapsible?: boolean;
  showOptionCounts?: boolean;
}) {
  const facetProps: FacetProps = {
    fieldId: facet.fieldId,
    label: facet.displayName,
    collapsible,
    showOptionCounts,
  };
  const facetType = getFacetTypeFromFacet(facet, hierarchicalFieldIds);

  switch (facetType) {
    case FacetType.NUMERICAL:
      return <NumericalFacetContent facet={facet} {...facetProps} />;
    case FacetType.HIERARCHICAL:
      return <HierarchicalFacetContent facet={facet} {...facetProps} />;
    case FacetType.STANDARD:
    // fall through
    default:
      return <StandardFacetContent facet={facet} {...facetProps} />;
  }
}

/**
 * Returns the type of the facet based on facet.
 * @param facet - {@link DisplayableFacet}
 * @param hierarchicalFieldIds - string
 * @returns {@link FacetType}
 *
 * @internal
 */
export function getFacetTypeFromFacet(
  facet: DisplayableFacet,
  hierarchicalFieldIds: string[] = []
) {
  if (hierarchicalFieldIds.includes(facet.fieldId)) {
    return FacetType.HIERARCHICAL;
  } else if (isStringFacet(facet)) {
    return FacetType.STANDARD;
  } else if (isNumericalFacet(facet)) {
    return FacetType.NUMERICAL;
  }

  return FacetType.STANDARD;
}
