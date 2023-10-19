import CollapsibleLabel, {
  builtInCssClasses,
  CollapsibleLabelCssClasses,
} from "./CollapsibleLabel";
import { Fragment, useMemo } from "react";
import { twMerge } from "../utils/useComposedCssClasses";
import { FilterGroupCssClasses } from "./FilterGroup";

/**
 * Props for the {@link FacetTitle} component.
 *
 * @internal
 */
export interface FacetTitleProps {
  /** The label to use in the title. */
  label?: string;
  /** {@inheritDoc FilterGroupProps.collapsible} */
  collapsible?: boolean;
  /** CSS classes for customizing the component styling. */
  customCssClasses?: FilterGroupCssClasses;
}

/**
 * The tile of a facet component.
 *
 * @param props - props to render the component
 * @returns A React component
 *
 * @internal
 */
export default function FacetTitle({
  label,
  customCssClasses,
  collapsible = true,
}: FacetTitleProps) {
  const collapsibleLabelCssClasses: CollapsibleLabelCssClasses = useMemo(() => {
    return {
      label: customCssClasses?.titleLabel,
    };
  }, [customCssClasses]);

  return (
    <Fragment>
      {collapsible ? (
        <CollapsibleLabel
          label={label}
          customCssClasses={collapsibleLabelCssClasses}
        />
      ) : (
        label && (
          <div
            className={twMerge(
              "mb-4",
              builtInCssClasses.label,
              collapsibleLabelCssClasses.label
            )}
          >
            {label}
          </div>
        )
      )}
    </Fragment>
  );
}