import type { TransformProps } from "@yext/pages";
import type { DirectoryProfile, TemplateRenderProps } from "src/types/entities";
import { getTranslations } from "src/i18n";

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<DirectoryProfile<never>>
> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  const translations = await getTranslations(data.document.locale);

  return Promise.resolve({
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
    translations,
  });
};
