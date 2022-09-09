import React, { useEffect, useState } from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import { TemplateDataProvider } from 'src/common/useTemplateData';
import config from '../config';
import { Header } from 'src/components/common/Header';
import type { TemplateRenderProps, BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

import { I18nextProvider } from 'react-i18next';
import { i18nInstanceBuilder } from "src/common/i18n";
import i18n from 'i18next';

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: React.ReactNode;
  i18nCallback: Function;
}

const Main = (props: MainProps) => {
  const [i18nInstance, setI18nInstance] = useState<typeof i18n | undefined>(undefined);
  const document = props.data.document as BaseProfile;
  const {
    _site,
    locale,
  } = document;

  const { children } = props;

  useEffect(() => {
    async function loadI18n(locale: string) {
      const myI18nInstance = await i18nInstanceBuilder(locale);
      if (myI18nInstance) { 
        setI18nInstance(myI18nInstance);
      }
    }

    loadI18n(locale);
  }, []);

  useEffect(() => {
    if (i18nInstance) {
      props.i18nCallback();
    }
  }, [i18nInstance]);


  return (
    <ConfigurationProvider value={config}>
      {i18nInstance && (
        <I18nextProvider i18n={i18nInstance}>
          <TemplateDataProvider value={props.data}>
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
          </TemplateDataProvider>
        </I18nextProvider>
      )}
    </ConfigurationProvider>
  )
}

export { Main };
