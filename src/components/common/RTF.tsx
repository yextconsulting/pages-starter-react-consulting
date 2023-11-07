import ReactMarkdown from "react-markdown";
import remarkYext, {
  yextRemarkRehypeHandlers,
} from "src/components/common/rtf-library/index";
import "src/components/common/RTF.css";
// import { Link } from "@yext/sites-components";

/**
 * This component is intended for rendering RTF v1 ("Legacy") fields.
 *
 * If you are trying to render a "Markdown" field, you can use react-markdown
 * directly without needing the additional plugins provided here.
 *
 * If you are trying to render a "v2" rich text field, import the LexicalRichText
 * component from \@yext/react-components.
 */
export default function RTF(props: { content: string }) {
  return (
    <ReactMarkdown
      className="RTF"
      children={props.content}
      remarkPlugins={[remarkYext]}
      remarkRehypeOptions={{
        handlers: yextRemarkRehypeHandlers,
      }}
      // Example of overriding an element with a custom component.
      // Uncomment this and the Link import to use.
      // components={{
      // a: (props) => {
      // 	return <Link className="Link Link--primary" target="_blank" href={props.href || ''}>{props.children}</Link>
      // },
      // }}
    />
  );
}
