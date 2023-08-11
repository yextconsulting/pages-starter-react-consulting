import { useAnalytics } from "@yext/sites-components";
import { getRuntime } from "@yext/pages/util";

declare global {
  interface Window {
    yextAnalyticsEnabled: boolean;
    enableYextAnalytics: () => void;
  }
}

// This provides the window.enableYextAnalytics function so that clients can enable Yext analytics
// after gaining user consent.
// This hook must be called within a descendant of an AnalyticsProvider.
export function useExposeEnableYAFunction() {
  const analytics = useAnalytics();
  if (!analytics) {
    throw new Error(
      "Attempted to enable Analytics outside of AnalyticsProvider"
    );
  }

  if (getRuntime().name === "browser") {
    window.enableYextAnalytics = () => {
      window.yextAnalyticsEnabled = true;
      analytics.optIn();
    };

    // There's a fallback for window.enableYextAnalytics that sets window.yextAnalyticsEnabled
    // to true in case a third-party script calls it before this code runs.
    // If that has happened, call the real function now.
    if (window.yextAnalyticsEnabled) {
      window.enableYextAnalytics();
    }
  }
}
