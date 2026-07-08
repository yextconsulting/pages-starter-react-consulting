import { ReactNode } from "react";
import classNames from "classnames";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "./ErrorBoundaryWithAnalytics";
import { MaybeLink } from "./MaybeLink";

interface BreadcrumbsPropsDefault {
  breadcrumbs: Array<{ slug: string; name: string }>;
  separator?: ReactNode;
  className?: string;
}

/*
 * The 'Breadcrumbs' component renders a breadcrumbs style navigation bar
 *
 * @example
 * ```
 * <Breadcrumbs breadcrumbs={defaultTransformer(streamBreadcrumbs)} />
 * ```
 *
 * @param {[{name: string, slug: string}]} breadcrumbs
 *          List of {crumbName, crumbUrl}
 * @param {ReactElement | string} separator
 *          between each breadcrumb - defaults to '/', also accepts any HTML element (<svg>, <img>, etc)
 */
const Breadcrumbs = (props: BreadcrumbsPropsDefault) => {
  const { breadcrumbs, className, separator = "/" } = props;
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <ErrorBoundaryWithAnalytics name="breadcrumbs">
      {breadcrumbs?.length && (
        <nav
          className={classNames("my-4 flex justify-center", className)}
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap gap-[8px] underline underline-offset-0">
            {breadcrumbs.map(({ name, slug }, idx) => {
              const isLast = idx === breadcrumbs.length - 1;

              return (
                <li
                  key={idx}
                  className="flex gap-[8px] font-gotham font-[500] text-sm text-brand-primary"
                >
                  <Breadcrumb
                    name={name}
                    slug={isLast ? "" : relativePrefixToRoot + slug}
                    index={idx}
                    {...props}
                  />
                  {!isLast && (
                    <span className="text-brand-gray-400">{separator}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </ErrorBoundaryWithAnalytics>
  );
};

interface BreadcrumbProps {
  name: string;
  slug?: string;
  index: number;
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { name, slug } = props;

  return (
    <MaybeLink className="" href={slug} eventName={`link${props.index}`}>
      <span>{name}</span>
    </MaybeLink>
  );
};

export default Breadcrumbs;
