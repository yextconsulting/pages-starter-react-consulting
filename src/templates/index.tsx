/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import React from "react";
import Team from "src/components/Team/Team";
import {
  TemplateProps,
  TemplateRenderProps,
  Template,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "src/index.css";
import { CustomFieldDebuggerReactProvider } from '@yext/custom-field-debugger';
import { defaultHeadConfig } from "src/common/head";
import { Link } from "@yext/sites-react-components";
import { LocationProfile } from "src/types/entities";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "logo",
      "meta",
      "name",
      "c_team.name",
      "c_team.address",
      "c_team.headshot",
      "c_team.mainPhone",
      "c_team.c_occupation",
      "c_team.emails",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildrenCount"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
 export const getPath: GetPath<TemplateProps> = (data) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (data): HeadConfig => {
  return defaultHeadConfig(data);
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Index: Template<TemplateRenderProps> = (data) => {
  const document = data.document as LocationProfile;
  const {
    name,
    c_team
  } = document;
  console.log(c_team[0]);
  return (
    <CustomFieldDebuggerReactProvider component={Index} {...data}>
      {/* <div>Hello {name}!</div> */}
      <Team title='' team={c_team} />
      {/* TODO(bhaines): delete before merging pr, these are just examples for anyone
      who wants to pull the code to test it out */}
      <div className="m-6 text-4xl">Buttons</div>
      <button className="m-4 Button Button--primary">Click Me</button>
      <button className="m-4 Button Button--secondary">Click Me</button>

      <div className="m-6 text-4xl">Links</div>
      <Link href="https://www.yext.com" className="m-4 Link">Click Me</Link>
      <Link href="https://www.yext.com" className="m-4 Link">Click Me</Link>
      <Link href="https://www.yext.com" className="m-4 Link Link--primary">Click Me</Link>
      <Link href="https://www.yext.com" className="m-4 Link Link--secondary">Click Me</Link>
      <Link href="https://www.yext.com" className="m-4 Link Link--underline">Click Me</Link>
      <Link href="https://www.yext.com" className="m-4 Link Link--primary Link--underline">Click Me</Link>

      <div className="m-6 text-4xl">Headings</div>
      <h1 className="m-4 Heading Heading--lead">Section Heading</h1>
      <h3 className="m-4 Heading Heading--head">Section Heading</h3>
      <h6 className="m-4 Heading Heading--sub">Section Heading</h6>
    </CustomFieldDebuggerReactProvider>
  );
};

export default Index;
