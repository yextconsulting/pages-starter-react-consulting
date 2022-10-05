import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

// import { getRuntime } from "@yext/pages/util";
// let ReactMarkdown:any;
// let ReactMarkdownOptions:any;
// if (!getRuntime().isServerSide) {
//   ReactMarkdown = (await import('react-markdown')).default;
//   ReactMarkdownOptions = (await import('react-markdown/lib/react-markdown')).default;
// }

interface RTFProps extends ReactMarkdownOptions {
  customYextProp?: undefined;
}

const RTF = ({customYextProp, ...props}: RTFProps) => {
  if (!props.children) return <></>;
  {/* TODO(rchhatre): need to update to slapshot remark plugin (https://github.com/yext/remark-yext) which will use the react-markdown plugin (https://github.com/remarkjs/react-markdown) */}
  return (ReactMarkdown && 
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 {...props} className="text-2xl" />,
        h2: ({ node, ...props }) => <h2 {...props} className="text-xl" />,
        h3: ({ node, ...props }) => <h3 {...props} className="text-lg" />,
        a: ({ node, ...props }) => <a  {...props} className="underline hover:no-underline" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside" />,
        ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside" />,
        div:({ node, ...props }) => <u {...props} className="underline" />,
      }}
      {...props}
    />
  );
};

export default RTF;