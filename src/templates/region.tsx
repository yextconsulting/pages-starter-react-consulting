export { getPath } from "src/layouts/region/getPath";
export { transformProps } from "src/layouts/region/transformProps";
export { getHeadConfig } from "src/layouts/region/getHeadConfig";
import { Template } from "@yext/pages";
import RegionLayout from "src/layouts/region/template";
import { configBuilder } from "src/layouts/region/configBuilder";
import { DirectoryProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Region: Template<TemplateRenderProps<DirectoryProfile<never>>> = (
  data
) => <RegionLayout {...data} />;

export default Region;
