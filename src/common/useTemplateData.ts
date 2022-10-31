import { TemplateRenderProps } from "@yext/pages/*";
import { createCtx } from "src/common/createCtx";

/**
 * A context provider that allows you to access all the TemplateRenderProps (relativePrefixToRoot,
 * path, document) from a child component without needing passthrough props.
 */
const [useTemplateData, TemplateDataProvider] = createCtx<TemplateRenderProps>();

export {
  useTemplateData,
  TemplateDataProvider
}
