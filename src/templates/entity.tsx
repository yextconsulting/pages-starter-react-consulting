export { getPath, transformProps, getHeadConfig } from "src/layouts/entity";
import { Template } from "@yext/pages";
import EntityLayout, { configBuilder } from "src/layouts/entity";
import { LocationProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Entity: Template<TemplateRenderProps<LocationProfile>> = (data) => (
  <EntityLayout {...data} />
);

export default Entity;
