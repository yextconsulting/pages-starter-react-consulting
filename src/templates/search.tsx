export { getPath, getHeadConfig, transformProps } from "src/layouts/search";
import { Template } from "@yext/pages";
import SearchLayout, { configBuilder } from "src/layouts/search";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Search: Template<TemplateRenderProps<SearchPageProfile>> = (data) => (
  <SearchLayout {...data} />
);

export default Search;
