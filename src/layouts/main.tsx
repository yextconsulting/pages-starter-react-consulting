import React, { useEffect, useState } from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import { TemplateRenderProps } from "@yext/pages";
import config from '../config';
import Header from 'src/components/common/Header';
import { BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

import { I18nextProvider } from 'react-i18next';
import { i18nInstanceBuilder } from "src/common/i18n";

interface MainProps {
  data: TemplateRenderProps;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  const document = props.data.document as BaseProfile;
  const {
    _site,
    locale,
  } = document;

  const { children } = props;


  const [i18nInstance, seti18nInstance] = useState<any>();
  useEffect(() => {seti18nInstance(i18nInstanceBuilder(locale))}, [locale]);

  return (
    <ConfigurationProvider value={config}>
      <I18nextProvider i18n={i18nInstance}>
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
    </ConfigurationProvider>
  )
}

export { Main };
