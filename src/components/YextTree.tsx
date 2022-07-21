import React from "react";
import Tree from "react-d3-tree";
import { useCallback, useState,SyntheticEvent } from "react";
import { HierarchyPointNode } from 'd3-hierarchy';

export interface Point {
  x: number;
  y: number;
}

export interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  yourUnderlings?: RawNodeDatum[];
}

export interface TreeNodeDatum extends RawNodeDatum {
  yourUnderlings?: TreeNodeDatum[];
  __rd3t: {
    id: string;
    depth: number;
    collapsed: boolean;
  };
}

export type SyntheticEventHandler = (evt: SyntheticEvent) => void;

export interface CustomNodeElementProps {
  /**
   * The full datum of the node that is being rendered.
   */
  nodeDatum: TreeNodeDatum;
  /**
   * The D3 `HierarchyPointNode` representation of the node, which wraps `nodeDatum`
   * with additional properties.
   */
  hierarchyPointNode: HierarchyPointNode<TreeNodeDatum>;
  /**
   * Toggles the expanded/collapsed state of the node.
   *
   * Provided for customized control flow; e.g. if we want to toggle the node when its
   * label is clicked instead of the node itself.
   */
  toggleNode: () => void;
  /**
   * The `onNodeClick` handler defined for `Tree` (if any).
   */
  onNodeClick: SyntheticEventHandler;
  /**
   * The `onNodeMouseOver` handler defined for `Tree` (if any).
   */
  onNodeMouseOver: SyntheticEventHandler;
  /**
   * The `onNodeMouseOut` handler defined for `Tree` (if any).
   */
  onNodeMouseOut: SyntheticEventHandler;
}

const renderForeignObjectNode = (nodeDatum: TreeNodeDatum, toggleNode: () => void, foreignObjectProps: any): any => {
  <g>
    <circle r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps} >
      <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.yourUnderlings && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
};

const useCenteredTree = ():[
  {x: number, y:number}, (node: HTMLDivElement) => void
] => { 
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useCallback((containerElem) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setTranslate({ x: width / 2, y: height / 2 });
      }
    }, []);
    return [translate, containerRef];
};

const containerStyles = {
    width: "100vw",
    height: "100vh"
  };


export default function YextTree({data}: {data: any}) {
    const [translate, containerRef] = useCenteredTree();
    const nodeSize = { x: 200, y: 200 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

    return (
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={data}
          translate={translate}
          nodeSize={nodeSize}
          // renderCustomNodeElement={(rd3tProps) =>
          //   renderForeignObjectNode(rd3tProps.nodeDatum, rd3tProps.toggleNode, foreignObjectProps)
          // }
          orientation="vertical"
        />
      </div>
    );
  }
  