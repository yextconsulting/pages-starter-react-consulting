/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

export { getPath } from "src/layouts/entity/getPath";
export { transformProps } from "src/layouts/entity/transformProps";
export { getHeadConfig } from "src/layouts/entity/getHeadConfig";
import { Template } from "@yext/pages";
import EntityLayout from "src/layouts/entity/template";
import { configBuilder } from "src/layouts/entity/configBuilder";
import { LocationProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Entity: Template<TemplateRenderProps<LocationProfile>> = (data) => (
  <EntityLayout {...data} />
);

export default Entity;
