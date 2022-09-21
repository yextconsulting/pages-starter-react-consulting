import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getRuntime } from "@yext/pages/util";

type RichTextProps = {
    content: string;
    className: string;
}

const RichText = (props: RichTextProps) => {
    const { content, className } = props;
    const runtime = getRuntime();
    return (
        <div className={className}>
            {/* TODO(rchhatre): need to update to slapshot remark plugin (https://github.com/yext/remark-yext) which will use the react-markdown plugin (https://github.com/remarkjs/react-markdown) */}
            {runtime.name === 'browser' && (<ReactMarkdown children={content} /> )}
        </div>
    );
};

export default RichText;