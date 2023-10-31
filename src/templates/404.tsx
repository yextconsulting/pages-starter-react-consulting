import type {
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
} from "@yext/pages";
import { getRuntime } from "@yext/pages/util";
import * as fourOhFour from "@yext/components-404";
import { isProduction } from "@yext/pages/util";
import { Link } from "@yext/sites-components";

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
