import { MAPS_API_KEY } from "src/config";

const isLocalDev = import.meta.env.DEV;

export const useMapKey = () => {
  const authObj = true
    ? { clientKey: "gme-yextinc" }
    : { apiKey: MAPS_API_KEY };

  return authObj;
};
