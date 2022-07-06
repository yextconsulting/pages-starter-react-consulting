import React from 'react';
import { YextProvider } from '@yext/sites-react-components';
import config from '../config';

interface MainProps {
  children?: React.ReactNode;
};

const Main = (props: MainProps) => {
  const { children } = props;

  return (
    <YextProvider value={config}>
      {children}
    </YextProvider>
  )
}

export { Main };
