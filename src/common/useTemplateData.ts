import { TemplateRenderProps, TemplateDataProviderProfile } from "src/types/entities";
import { createCtx } from "src/common/createCtx";

type TemplateDataProviderProps = TemplateRenderProps<TemplateDataProviderProfile>;

/**
 * A context provider that allows you to access all the TemplateRenderProps (relativePrefixToRoot,
 * path, document.locale, document._site, and __meta) from a child component without needing passthrough props.
 */
const [useTemplateData, TemplateDataProvider] = createCtx<TemplateDataProviderProps>();

export {
  useTemplateData,
  TemplateDataProvider
}
