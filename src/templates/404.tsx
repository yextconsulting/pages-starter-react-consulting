import type {
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
} from "@yext/pages";
import { getRuntime } from "@yext/pages/util";
import * as fourOhFour from "@yext/components-404";
import { isProduction } from "@yext/pages/util";
import { Link } from "@yext/pages-components";

// TODO: Uncomment and add 404 pixel url to enable 404 pixel monitoring
// export const PROD_404_PIXEL_URL = "<404 PIXEL URL>";

export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "404",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `404.html`;
};

const FourOhFourTemplate = (data: TemplateRenderProps) => {
  const runtime = getRuntime();
  if (runtime.name === "browser") {
    const destinationUrl = `https://${window.location.hostname}/`;
    const isProd = isProduction(data.document.siteDomain);
    const laf = new fourOhFour.LostAndFound(
      window.location.href,
      document.referrer,
      {
        destinationUrl,
        isStaging: !isProd,
        siteDomain: data.document.siteDomain,

        // TODO: Uncomment this to enable 404 pixel monitoring
        // pixelUrl: isProd ? PROD_404_PIXEL_URL : "",
      }
    );
    laf.installBasicHooks();
    laf.run();
  }

  return (
    <div>
      <p>Sorry, we could not find the URL you were looking for.</p>
      <p>
        If you are not automatically redirected to our homepage,{" "}
        <Link href="/index.html">please click here.</Link>
      </p>
    </div>
  );
};

export default FourOhFourTemplate;
