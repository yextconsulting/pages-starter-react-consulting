import { TemplateRenderProps, BaseProfile } from "src/types/entities";
import { createCtx } from "src/common/createCtx";

type TemplateDataProviderProps = TemplateRenderProps<BaseProfile>;

/**
 * A context provider that allows you to access all the TemplateRenderProps on the BaseProfile
 * from a child component without needing passthrough props.
 */
const [useTemplateData, TemplateDataProvider] =
  createCtx<TemplateDataProviderProps>(
    "Attempted to call useTemplateData outside of TemplateDataProvider"
  );

export { useTemplateData, TemplateDataProvider };
