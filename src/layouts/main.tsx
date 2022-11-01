import React from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import { TemplateDataProvider } from 'src/common/useTemplateData';
import config from '../config';
import { Header } from 'src/components/common/Header';
import type { TemplateRenderProps, BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

interface MainProps {
  data: TemplateRenderProps<BaseProfile>;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  const {
    _site
  } = props.data.document;

  const { children } = props;

  return (
    <ConfigurationProvider value={config}>
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
    </ConfigurationProvider>
  )
}

export { Main };
