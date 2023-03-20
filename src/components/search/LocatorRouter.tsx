import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { createCtx } from "src/common/createCtx";
import { Router } from "./utils/defaultRouter";

type LocatorRouterProps = {
  router: Router;
  children: JSX.Element;
};

export const [useLocatorRouter, LocatorRouterProvider] = createCtx<{
  initialParamsLoaded: boolean;
}>("Attempted to call useLocatorRouter outside of LocatorRouterProvider");

export const LocatorRouter = (props: LocatorRouterProps) => {
  const searchActions = useSearchActions();
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);

  // Load state from URL params once on page load.
  useEffect(() => {
    const loadParams = async () => {
      const params = new URLSearchParams(window.location.search);
      await props.router.deserializeParams(params, searchActions);
      setInitialParamsLoaded(true);
    };
    loadParams();
  }, [props.router, searchActions]);

  // Update URL params on every state.filters change.
  useEffect(() => {
    if (!initialParamsLoaded) {
      return;
    }

    searchActions.addListener({
      valueAccessor: (state) => state.filters,
      callback: (state) => {
        const params = props.router.serializeState(state);
        window.history.pushState({}, "", `?${params.toString()}`);
      },
    });
  }, [props.router, searchActions, initialParamsLoaded]);

  return (
    <LocatorRouterProvider value={{ initialParamsLoaded }}>
      {props.children}
    </LocatorRouterProvider>
  );
};
