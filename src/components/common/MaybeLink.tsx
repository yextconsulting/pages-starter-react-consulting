import React from "react";

type maybeLinkProps = {
  linkUrl?: string;
  children?: React.ReactNode;
  className?: string;
}

const MaybeLink = (props: maybeLinkProps) => {
  if (props.linkUrl) {
    return (
      <a className={props.className} href={props.linkUrl}>
        {props.children}
      </a>
    );
  } else {
    return (<>{props.children}</>);
  }
};

export {
  MaybeLink,
}
