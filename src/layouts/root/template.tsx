import type { Template } from "@yext/pages";
import type { DirectoryProfile, TemplateRenderProps } from "src/types/entities";
import { Main } from "src/layouts/main";
import DirectoryLayout from "src/layouts/directory";
import "src/index.css";

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Root: Template<TemplateRenderProps<DirectoryProfile<never>>> = (data) => {
  return (
    <Main data={data}>
      <DirectoryLayout data={data} />
    </Main>
  );
};

export default Root;
