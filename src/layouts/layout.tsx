import React, { useEffect, useState } from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import type { TemplateRenderProps } from "@yext/pages";
import { Header } from 'src/components/common/Header';
import type { BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

interface LayoutProps {
  data: TemplateRenderProps;
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const document = props.data.document as BaseProfile;
  const {
    _site,
  } = document;

  const { children } = props;

  return (
    <>
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
    </>
  )
}

export { Layout };
