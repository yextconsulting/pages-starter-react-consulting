import { useState } from "react";
import type {
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
} from "@yext/pages";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

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
  return `static.html`;
};

function FirstComponent() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<div>X</div>}
      defaultExpandIcon={<div>O</div>}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

const FourOhFourTemplate = (data: TemplateRenderProps) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <FirstComponent />
      <button onClick={() => setCount((old) => old + 1)}>{count}</button>
    </div>
  );
};

export default FourOhFourTemplate;
