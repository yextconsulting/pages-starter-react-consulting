export { getPath, transformProps, getHeadConfig } from "src/layouts/city";
import { Template } from "@yext/pages";
import CityLayout, { configBuilder } from "src/layouts/city";
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
