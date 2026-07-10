export { getPath } from "src/layouts/search/getPath";
export { transformProps } from "src/layouts/search/transformProps";
import { Template } from "@yext/pages";
import { useEffect } from "react";
import { configBuilder } from "src/layouts/search/configBuilder";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";

// When copying this file for multibrand, you can pass arguments
// to customize the stream id or filter
export const config = configBuilder();

const LOCATOR_MODULE_SCRIPT_SRC =
  "https://otfchzoo6g-42768-d.preview.pagescdn.com/modules/locator-module.umd.js";

const Search: Template<TemplateRenderProps<SearchPageProfile>> = () => {
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${LOCATOR_MODULE_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = LOCATOR_MODULE_SCRIPT_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div>
      <div id="locator-module"></div>
    </div>
  );
};

export default Search;
