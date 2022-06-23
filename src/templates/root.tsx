/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

 import * as React from "react";
 import {
	 Data,
	 Default,
	 GetPath,
	 TemplateConfig,
	 GetHeadConfig,
 } from "@yext/yext-sites-scripts";
 import "../index.css";
import { defaultHeadConfig } from "../common/head";
 
 /**
	* Required when Knowledge Graph data is used for a template.
	*/
 export const config: TemplateConfig = {
	 stream: {
		 $id: "my-stream-id-2",
		 // Specifies the exact data that each generated document will contain. This data is passed in
		 // directly as props to the default exported function.
		 fields: [
			 "id",
			 "uid",
			 "meta",
			 "name",
			 "slug",
			 "c_meta",
		 ],
		 // Defines the scope of entities that qualify for this stream.
		 filter: {
			 entityTypes: ["ce_root"],
			// TODO: use the auto-generated saved filter instead of entity type
			// 			 streams doesn't currently support namespaced ("dm_") filters
			//  savedFilterIds: ["dm_locationDirectory"],
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
 export const getPath: GetPath<Data> = (data) => {
	 return data.document.streamOutput.slug;
 };
 
 /**
	* This allows the user to define a function which will take in their template
	* data and procude a HeadConfig object. When the site is generated, the HeadConfig
	* will be used to generate the inner contents of the HTML document's <head> tag.
	* This can include the title, meta tags, script tags, etc.
	*/
 export const getHeadConfig: GetHeadConfig<Data> = (data) => {
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
 const Root: Default<Data> = (data) => {
	const { streamOutput } = data.document;
	 const {
		 name
	 } = streamOutput;
 
	 return (
		 <div>Hello {name}!</div>
	 );
 };
 
 export default Root;