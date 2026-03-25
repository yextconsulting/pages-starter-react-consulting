import { MouseEventHandler, ReactNode } from "react";
import { Link } from "@yext/pages-components";

type maybeLinkProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  eventName?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const MaybeLink = (props: maybeLinkProps) => {
  if (props.href) {
    return (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    );
  } else {
    return <>{props.children}</>;
  }
};

export { MaybeLink };
