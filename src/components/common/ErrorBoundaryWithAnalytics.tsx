import { AnalyticsScopeProvider } from "@yext/pages/components";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrorBoundaryWithAnalyticsProps = {
  scope: string;
  children: ReactNode;
};

/**
 * Setup an error boundary around a child component to prevent the entire React app from
 * unmounting on an error. Also bundle the AnalyticsScopeProvider for convenience.
 */
const ErrorBoundaryWithAnalytics = (props: ErrorBoundaryWithAnalyticsProps) => {
  const handleError = () => {
    // Setup any sentry reporting here.
    console.error(`Error occured in "${props.scope}" scope.`);
  };

  return (
    <ErrorBoundary onError={handleError} fallback={<></>}>
      <AnalyticsScopeProvider name={props.scope}>
        {props.children}
      </AnalyticsScopeProvider>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithAnalytics;
