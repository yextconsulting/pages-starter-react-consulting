export { getPath } from "src/layouts/search/getPath";
export { getHeadConfig } from "src/layouts/search/getHeadConfig";
export { transformProps } from "src/layouts/search/transformProps";
import { Template } from "@yext/pages";
import SearchLayout from "src/layouts/search/template";
import { configBuilder } from "src/layouts/search/configBuilder";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Search: Template<TemplateRenderProps<SearchPageProfile>> = (data) => (
  <SearchLayout {...data} />
);

export default Search;
