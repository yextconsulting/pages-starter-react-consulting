import type { URLSearchParamsInit, NavigateOptions } from "react-router-dom";

export type SetSearchParamsType = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions
) => void;
