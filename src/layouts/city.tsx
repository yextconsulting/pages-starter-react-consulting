/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import type {
  Template,
  GetPath,
  TemplateConfig,
  TransformProps,
  GetHeadConfig,
  Stream,
} from "@yext/pages";
import "src/index.css";
import { defaultHeadConfig } from "src/common/head";
import type {
  DirectoryProfile,
  LocationProfile,
  TemplateProps,
  TemplateRenderProps,
} from "src/types/entities";
import { Main } from "src/layouts/main";
import DirectoryLayout from "src/layouts/directory";
import { getTranslations } from "src/i18n";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const configBuilder: (
  id?: string,
  filter?: Stream["filter"]
) => TemplateConfig = (id?: string, filter?: Stream["filter"]) => ({
  stream: {
    $id: id || "directory-city",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_meta",
      // Directory Grid Fields
      "dm_directoryParents.slug",
      "dm_directoryParents.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: filter || {
      savedFilterIds: ["dm_defaultDirectory_address_city"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
  },
});

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps<DirectoryProfile<never>>> = (
  data
) => {
  return data.document.slug;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps<DirectoryProfile<never>>
> = (data) => {
  return defaultHeadConfig(data);
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<DirectoryProfile<never>>
> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  const translations = await getTranslations(data.document.locale);

  return Promise.resolve({
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
    translations,
  });
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
const City: Template<TemplateRenderProps<DirectoryProfile<LocationProfile>>> = (
  data
) => {
  return (
    <Main data={data}>
      <DirectoryLayout data={data} />
    </Main>
  );
};

export default City;
