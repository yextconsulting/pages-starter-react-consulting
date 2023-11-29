import type { GetPath } from "@yext/pages";
import type { DirectoryProfile, TemplateProps } from "src/types/entities";

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<DirectoryProfile<never>>> = (
  data
) => {
  return data.document.slug;
};
