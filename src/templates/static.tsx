/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */

import React from "react";
import { useState } from "react";
import fetch from "fetch-everywhere";
import { Pokemon } from "pokenode-ts";
import {
  TemplateProps,
  Default,
  GetPath,
  GetStaticProps,
  TemplateConfig,
} from "@yext/yext-sites-scripts";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "static",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = () => {
  return `static/${Math.random().toString()}`;
};

/**
 * A local type for getStaticProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Default<TemplateProps> = (data) => {
  return (
    <>
    Hello
    </>
  );
};

export default Static;
