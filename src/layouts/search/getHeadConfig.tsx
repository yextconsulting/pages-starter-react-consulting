import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { GetHeadConfig, HeadConfig } from "@yext/pages";
import { defaultHeadConfig } from "src/common/head";

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document"s <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<SearchPageProfile>
> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};
