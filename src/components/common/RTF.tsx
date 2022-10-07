import React from 'react';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

import { getRuntime } from "@yext/pages/util";
let ReactMarkdown:any;
if (!getRuntime().isServerSide) {
  ReactMarkdown = (await import('react-markdown')).default;
}

interface RTFProps extends ReactMarkdownOptions {
  customYextProp?: undefined;
}

const RTF = ({customYextProp, ...props}: RTFProps) => {
  if (!props.children) return <></>;
  if (!ReactMarkdown) return null;
  {/* TODO(rchhatre): need to update to slapshot remark plugin (https://github.com/yext/remark-yext) which will use the react-markdown plugin (https://github.com/remarkjs/react-markdown) */}
  return (ReactMarkdown && 
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => <h1 {...props} className="text-2xl" />,
        h2: ({ ...props }) => <h2 {...props} className="text-xl" />,
        h3: ({ ...props }) => <h3 {...props} className="text-lg" />,
        a: ({ ...props }) => <a  {...props} className="underline hover:no-underline" />,
        ol: ({ ...props }) => <ol {...props} className="list-decimal list-inside" />,
        ul: ({ ...props }) => <ul {...props} className="list-disc list-inside" />,
        div:({ ...props }) => <u {...props} className="underline" />,
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
};

export default RTF;