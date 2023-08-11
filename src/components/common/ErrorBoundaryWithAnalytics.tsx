import { AnalyticsScopeProvider } from "@yext/sites-components";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrorBoundaryWithAnalyticsProps = {
  name: string;
  children: ReactNode;
};

/**
 * Setup an error boundary around a child component to prevent the entire React app from
 * unmounting on an error. Also bundle the AnalyticsScopeProvider for convenience.
 */
const ErrorBoundaryWithAnalytics = (props: ErrorBoundaryWithAnalyticsProps) => {
  const handleError = () => {
    // Setup any sentry reporting here.
    console.error(`Error occured in "${props.name}" scope.`);
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
