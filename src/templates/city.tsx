export { getPath } from "src/layouts/city/getPath";
export { transformProps } from "src/layouts/city/transformProps";
export { getHeadConfig } from "src/layouts/city/getHeadConfig";
import { Template } from "@yext/pages";
import CityLayout from "src/layouts/city/template";
import { configBuilder } from "src/layouts/city/configBuilder";
import {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const City: Template<TemplateRenderProps<DirectoryProfile<LocationProfile>>> = (
  data
) => <CityLayout {...data} />;

export default City;
