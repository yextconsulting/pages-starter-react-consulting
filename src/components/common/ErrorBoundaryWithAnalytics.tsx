import { AnalyticsScopeProvider } from "@yext/pages-components";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrorBoundaryWithAnalyticsProps = {
  name: string;
  children: ReactNode;
  noAnalyticsScope?: boolean;
};

// TODO: Comment this in and add Sentry DSN to enable Sentry alerting
// import * as Sentry from "@sentry/browser";
// Sentry.init({
//   dsn: "<ADD SENTRY DSN HERE>",
//   integrations: [
//     Sentry.captureConsoleIntegration({ levels: ["error"] }),
//   ],
//   beforeSend(event) {
//     const errorMessage =
//       event.exception?.values?.[0]?.value ??
//       event.logentry?.message ??
//       event.message ??
//       "";
//
//     if (errorMessage.includes("chrome-extension://")) {
//       return null;
//     }
//
//     return event;
//   },
// });

/**
 * Setup an error boundary around a child component to prevent the entire React app from
 * unmounting on an error. Also bundle the AnalyticsScopeProvider for convenience.
 */
const ErrorBoundaryWithAnalytics = (props: ErrorBoundaryWithAnalyticsProps) => {
  const handleError = (err: Error) => {
    console.error(`Error occured in "${props.name}" scope.`, err);

    // TODO: Uncomment this in to enable Sentry alerting
    // Sentry.captureException(err);
  };

  if (props.noAnalyticsScope) {
    return (
      <ErrorBoundary onError={handleError} fallback={<></>}>
        {props.children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary onError={handleError} fallback={<></>}>
      <AnalyticsScopeProvider name={props.name}>
        {props.children}
      </AnalyticsScopeProvider>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithAnalytics;
