import { ReactNode } from "react";
import { getRuntime } from "@yext/pages/util";
import { BrowserRouter } from "react-router-dom";

// document needs to be defined in order to call useSearchParams() within BrowserRouter.

type SearchParamWrapperProps = {
  children: ReactNode
}

export default function SearchParamWrapper({ children }: SearchParamWrapperProps): JSX.Element|null {
  const runtime = getRuntime();

  if (runtime.name === 'browser') {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    )
  }

  console.error("useSearchParams is only usable when document is defined. Check that the current runtime is a browser");
  return null;
}
