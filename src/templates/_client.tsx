// Environment: browser

import * as ReactDOM from "react-dom";
import * as React from "react";
import { PageContext } from "@yext/pages";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;

  ReactDOM.hydrate(
    <CacheProvider value={cache}>
      <Page {...pageProps} />
    </CacheProvider>,
    document.getElementById("test")
  );
};

export { render };
