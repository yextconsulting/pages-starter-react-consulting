import { twMerge } from "../utils/useComposedCssClasses";
/**
 * A divider component used to separate NumericalFacets, HierarchicalFacets, StandardFacets,
 * and StaticFilters.
 *
 * @param props - A customizable className for filter divider
 * @returns A React component for filter divider
 *
 * @public
 */
export default function FilterDivider({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <div className={twMerge("w-full h-px bg-gray-200 my-4", className)} />;
}
