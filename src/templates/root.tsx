export { getPath, transformProps, getHeadConfig } from "src/components/root";
import { Template } from "@yext/pages";
import RootLayout, { configBuilder } from "src/components/root";
import { DirectoryProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const Root: Template<TemplateRenderProps<DirectoryProfile<never>>> = (data) => (
  <RootLayout {...data} />
);

export default Root;
