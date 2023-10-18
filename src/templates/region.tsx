export { getPath, transformProps, getHeadConfig } from "src/components/region";
import { Template } from "@yext/pages";
import RegionLayout, { configBuilder } from "src/components/region";
import { DirectoryProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const City: Template<TemplateRenderProps<DirectoryProfile<never>>> = (data) => (
  <RegionLayout {...data} />
);

export default City;
