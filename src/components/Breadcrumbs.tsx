import { ReactNode } from "react";
import classNames from "classnames";
import { Link } from "@yext/sites-components";
import { useTemplateData } from "src/common/useTemplateData";

interface BreadcrumbsPropsDefault {
  breadcrumbs: Array<{ slug: string; name: string }>;
  separator?: ReactNode;
  className?: string;
  addAnalytics?: boolean;
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
    <>
      {breadcrumbs?.length && (
        <nav
          className={classNames("Breadcrumbs my-4", className)}
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap">
            {breadcrumbs.map(({ name, slug }, idx) => {
              const isLast = idx === breadcrumbs.length - 1;

              return (
                <li key={idx}>
                  <Breadcrumb
                    name={name}
                    slug={isLast ? "" : relativePrefixToRoot + slug}
                    index={idx}
                    {...props}
                  />
                  {!isLast && (
                    <span className="mx-2 text-brand-gray-400">
                      {separator}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};

interface BreadcrumbProps {
  name: string;
  slug?: string;
  index: number;
  addAnalytics?: boolean;
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { name, slug } = props;

  if (slug) {
    return (
      <Link
        className="Link--breadcrumbs Link--underline"
        href={slug}
        eventName={props.addAnalytics ? "breadcrumb_" + props.index : ""}
      >
        <span>{name}</span>
      </Link>
    );
  }

  return <span>{name}</span>;
};

export default Breadcrumbs;
