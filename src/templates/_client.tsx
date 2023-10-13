// Environment: browser

import * as ReactDOM from "react-dom";
import { PageContext } from "@yext/pages";
import { CustomFieldDebuggerReactProvider } from "@yext/custom-field-debugger";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;

  // Enable custom-field-debugger on pages generated from these streams
  const cfdStreamIdWhitelist = ["locations"];

  const streamId = pageProps.document.__.streamId;
  if (cfdStreamIdWhitelist.includes(streamId)) {
    ReactDOM.hydrate(
      <CustomFieldDebuggerReactProvider component={Page} pageProps={pageProps}>
        <Page {...pageProps} />
      </CustomFieldDebuggerReactProvider>,
      document.getElementById("reactele")
    );
    return;
  } else {
    ReactDOM.hydrate(
      <Page {...pageProps} />,
      document.getElementById("reactele")
    );
    return;
  }
};
