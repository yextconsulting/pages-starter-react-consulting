import React, { useEffect, useState } from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import { TemplateRenderProps } from "@yext/pages";
import config from '../config';
import Header from 'src/components/common/Header';
import { BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

import { I18nextProvider } from 'react-i18next';
import { i18nInstanceBuilder } from "src/common/i18n";
import i18n from 'i18next';

interface MainProps {
  data: TemplateRenderProps;
  children?: React.ReactNode;
  i18nCallback: Function;
}

const Main = (props: MainProps) => {
  const [translationsLoaded, setTranslationsLoaded] = useState(false)
  const document = props.data.document as BaseProfile;
  const {
    _site,
    locale,
  } = document;

  const { children } = props;


  let i18nInstance;
  useEffect(() => {
    i18nInstance = i18nInstanceBuilder(locale, () => {
      props.i18nCallback();
      setTranslationsLoaded(true);
    });
  }, []);

  return (
    <ConfigurationProvider value={config}>
      {translationsLoaded && (
        <I18nextProvider i18n={i18nInstance as unknown as typeof i18n}>
          <Header
            logo={_site?.c_header?.logo}
            links={_site?.c_header?.links || []}
          />
          {children}
          <Footer
            copyrightMessage={_site.c_copyrightMessage || ""}
            facebook={_site.c_facebook}
            instagram={_site.c_instagram}
            youtube={_site.c_youtube}
            twitter={_site.c_twitter}
            linkedIn={_site.c_linkedIn}
            footerLinks={_site.c_footerLinks || []}
          />
        </I18nextProvider>
      )}
    </ConfigurationProvider>
  )
}

export { Main };
