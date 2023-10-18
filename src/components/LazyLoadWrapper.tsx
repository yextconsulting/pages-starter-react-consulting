import { useRef, ReactNode } from "react";
import { useIfVisible } from "src/common/useIfVisible";

interface LazyLoadWrapperProps {
  children: ReactNode;
}

// This component can be used to lazy load its children components.
export const LazyLoadWrapper = (props: LazyLoadWrapperProps) => {
  const { children } = props;

  const wrapperRef = useRef(null);
  const isVisible = useIfVisible(wrapperRef);

  if (!isVisible) {
    return <div ref={wrapperRef}></div>;
  }

  return <>{children}</>;
};
