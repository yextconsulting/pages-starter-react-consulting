// Environment: server

import * as ReactDOMServer from "react-dom/server";
import { PageContext } from "@yext/pages";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { cache } from "@emotion/css";

// Environment: server

export const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;

  const viewHtml = ReactDOMServer.renderToString(
    // Use cache from @emotion/css instead of creating our own using createCache from @emotion/cache
    // https://github.com/emotion-js/emotion/issues/2731
    <CacheProvider value={cache}>
      <Page {...pageProps} />
    </CacheProvider>
  );

  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);
  const chunks = extractCriticalToChunks(viewHtml);
  const styles = constructStyleTagsFromChunks(chunks);

  return `<!DOCTYPE html>
	<html lang="<!--app-lang-->">
		<head>${styles}</head>
		<body>
			<div id="reactele">${ReactDOMServer.renderToString(
        <Page {...pageProps} />
      )}</div>
		</body>
	</html>
	`;
};

export const replacementTag = "<!--YEXT-SERVER-->";

export const indexHtml = `${replacementTag}`;
