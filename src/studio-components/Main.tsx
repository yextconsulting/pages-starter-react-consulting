import type { ReactNode } from "react";
import type { TemplateRenderProps, BaseProfile } from "../types/entities";
import { AnalyticsProvider } from "@yext/pages/components";
import ErrorBoundaryWithAnalytics from "../components/common/ErrorBoundaryWithAnalytics";
import { ConfigurationProvider } from "@yext/sites-react-components";
import { TemplateDataProvider } from "../common/useTemplateData";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { useExposeEnableYAFunction } from "../common/useExposeEnableYAFunction";
import config from "../config";

export interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <ConfigurationProvider value={config}>
      <AnalyticsProvider templateData={props.data} requireOptIn={true}>
        <MainInternal {...props} />
      </AnalyticsProvider>
    </ConfigurationProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { _site } = props.data.document;

  const { children } = props;

  // Create the global window.enableYextAnalytics function for clients that need to get user consent
  // If consent is not required, set requireOptIn on AnalyticsProvider above to false.
  useExposeEnableYAFunction();

  return (
    <TemplateDataProvider value={props.data}>
      <ErrorBoundaryWithAnalytics name="header">
        <Header
          logo={_site?.c_header?.logo}
          links={_site?.c_header?.links || []}
        />
      </ErrorBoundaryWithAnalytics>
      {children}
      <ErrorBoundaryWithAnalytics name="footer">
        <Footer
          copyrightMessage={_site.c_copyrightMessage || ""}
          facebook={_site.c_facebook}
          instagram={_site.c_instagram}
          youtube={_site.c_youtube}
          twitter={_site.c_twitter}
          linkedIn={_site.c_linkedIn}
          footerLinks={_site.c_footerLinks || []}
        />
      </ErrorBoundaryWithAnalytics>
    </TemplateDataProvider>
  );
};

export default Main;
