import React from "react";
import { ConfigurationProvider } from "@yext/sites-react-components";
import { TemplateDataProvider } from "src/common/useTemplateData";
import config from "../config";
import { Header } from "src/components/common/Header";
import type { TemplateRenderProps, BaseProfile } from "src/types/entities";
import Footer from "src/components/common/Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { useExposeEnableYAFunction } from "src/common/useExposeEnableYAFunction";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <ConfigurationProvider value={config}>
      <AnalyticsProvider templateData={props.data} requireOptIn={false}>
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
      <AnalyticsScopeProvider name="header">
        <Header
          logo={_site?.c_header?.logo}
          links={_site?.c_header?.links || []}
        />
      </AnalyticsScopeProvider>
      {children}
      <AnalyticsScopeProvider name="footer">
        <Footer
          copyrightMessage={_site.c_copyrightMessage || ""}
          facebook={_site.c_facebook}
          instagram={_site.c_instagram}
          youtube={_site.c_youtube}
          twitter={_site.c_twitter}
          linkedIn={_site.c_linkedIn}
          footerLinks={_site.c_footerLinks || []}
        />
      </AnalyticsScopeProvider>
    </TemplateDataProvider>
  );
};

export { Main };
