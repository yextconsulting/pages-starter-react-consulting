import React, { useEffect, useState } from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import type { TemplateRenderProps } from "@yext/pages";
import config from '../config';
import { Header } from 'src/components/common/Header';
import type { BaseProfile } from 'src/types/entities';
import Footer from 'src/components/common/Footer';

import { I18nextProvider } from 'react-i18next';
import { i18nInstanceBuilder } from "src/common/i18n";
import i18n from 'i18next';

import { CustomFieldDebuggerReactProvider } from '@yext/custom-field-debugger';

interface MainProps {
  data: TemplateRenderProps;
  children?: React.ReactNode;
  i18nCallback?: Function;
  template: React.FC<TemplateRenderProps>;
}

const Main = (props: MainProps) => {
  const [i18nInstance, setI18nInstance] = useState<typeof i18n | undefined>(undefined);
  const document = props.data.document as BaseProfile;
  const {
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
    if (i18nInstance && props.i18nCallback) {
      props.i18nCallback();
    }
  }, [i18nInstance]);

  return (
    <ConfigurationProvider value={config}>
      <CustomFieldDebuggerReactProvider component={props.template} {...props.data} debug={true} >
        {i18nInstance && (
          <I18nextProvider i18n={i18nInstance}>
            {children}
          </I18nextProvider>
        )}
      </CustomFieldDebuggerReactProvider>
    </ConfigurationProvider>
  )
}

export { Main };
