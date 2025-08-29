import { AnalyticsScopeProvider } from "@yext/pages-components";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/browser";

type ErrorBoundaryWithAnalyticsProps = {
  name: string;
  children: ReactNode;
};

Sentry.init({
  dsn: "https://c5880be0d3351c04bfdcee4623fa68c8@o4509159123058688.ingest.us.sentry.io/4509447365132289",
});

/**
 * Setup an error boundary around a child component to prevent the entire React app from
 * unmounting on an error. Also bundle the AnalyticsScopeProvider for convenience.
 */
const ErrorBoundaryWithAnalytics = (props: ErrorBoundaryWithAnalyticsProps) => {
  const handleError = (err: Error) => {
    console.error(`Error occured in "${props.name}" scope.`);
    Sentry.captureException(err);
  };

  return (
    <ErrorBoundary onError={handleError} fallback={<></>}>
      <AnalyticsScopeProvider name={props.name}>
        {props.children}
      </AnalyticsScopeProvider>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithAnalytics;
