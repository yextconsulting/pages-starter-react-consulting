import { TemplateRenderProps } from "src/types/entities";
import { createCtx } from "src/common/createCtx";

type TemplateDataProviderProps = TemplateRenderProps<{readonly locale: string}>;

/**
 * A context provider that allows you to access all the TemplateRenderProps (relativePrefixToRoot,
 * path, document.locale, and __meta) from a child component without needing passthrough props.
 */
const [useTemplateData, TemplateDataProvider] = createCtx<TemplateDataProviderProps>();

export {
  useTemplateData,
  TemplateDataProvider
}
