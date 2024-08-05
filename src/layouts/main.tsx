import type { ReactNode } from "react";
import type { TemplateRenderProps, BaseProfile } from "src/types/entities";
import { AnalyticsProvider } from "@yext/pages-components";
import { TemplateDataProvider } from "src/common/useTemplateData";
import { Header } from "src/components/common/Header";
import { Footer } from "src/components/common/Footer";
import { useExposeEnableYAFunction } from "src/common/useExposeEnableYAFunction";
import { initi18n } from "src/i18n";
import "@yext/pages-components/style.css";

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: ReactNode;
}

const Main = (props: MainProps) => {
  initi18n(props.data.translations || {}, props.data.document.locale);

  if (!YEXT_PUBLIC_ANALYTICS_API_KEY) {
    console.error(
      "Add an analytics events API key to the .env file or as a site variable to enable Yext Analytics."
    );
  }

  return (
    <AnalyticsProvider
      apiKey={YEXT_PUBLIC_ANALYTICS_API_KEY}
      currency="USD"
      templateData={props.data}
      requireOptIn={false}
      enableDebugging={true}
    >
      <MainInternal {...props} />
    </AnalyticsProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { children } = props;

  // Create the global window.enableYextAnalytics function for clients that need to get user consent
  // If consent is not required, set requireOptIn on AnalyticsProvider above to false.
  useExposeEnableYAFunction();

  return (
    <TemplateDataProvider value={props.data}>
      <Header />
      {children}
      <Footer />
    </TemplateDataProvider>
  );
};

export { Main };
