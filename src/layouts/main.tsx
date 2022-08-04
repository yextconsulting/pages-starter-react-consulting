import React from 'react';
import { ConfigurationProvider } from '@yext/sites-react-components';
import config from '../config';

interface MainProps {
  children?: React.ReactNode;
};

const Main = (props: MainProps) => {
  const { children } = props;

  return (
    <ConfigurationProvider value={config}>
      {children}
    </ConfigurationProvider>
  )
}

export { Main };
