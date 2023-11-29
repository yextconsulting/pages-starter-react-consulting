import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { TransformProps } from "@yext/pages";
import { getTranslations } from "src/i18n";

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<SearchPageProfile>
> = async (data) => {
  const translations = await getTranslations(data.document.locale);

  return {
    ...data,
    translations,
  };
};
