import React from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import { TemplateRenderProps } from "@yext/pages";
import config from '../config';
import Header from 'src/components/Header';
import { BaseProfile } from 'src/types/entities';
import Footer from 'src/components/Footer';

interface MainProps {
  data: TemplateRenderProps;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  const document = props.data.document as BaseProfile;
  const {
    _site
  } = document;

  const { children } = props;

  return (
    <ConfigurationProvider value={config}>
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
    </ConfigurationProvider>
  )
}

export { Main };
