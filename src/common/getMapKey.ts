import { MAPS_API_KEY } from "src/config";

const isLocalDev = import.meta.env.DEV;

export const getMapKey = () => {
  if (MAPS_API_KEY === "<REPLACE-ME>") {
    console.error(
      "Add a map provider API key to config.ts or as a site variable to enable map functionality on staging or prod."
    );
  }

  const googleLocalDevKey = { clientKey: "gme-yextinc" };
  const mapboxLocalDevKey = {
    apiKey: "pk.eyJ1IjoieWV4dCIsImEiOiJqNzVybUhnIn0.hTOO5A1yqfpN42-_z_GuLw",
  };

  const authObj = isLocalDev ? googleLocalDevKey : { apiKey: MAPS_API_KEY };

  return authObj;
};
