/* eslint-disable no-console */
import UniversalGeocoder from "../../dist/UniversalGeocoder";

const geoPluginGeocoder = UniversalGeocoder.createGeocoder({
  provider: "geoplugin",
});
geoPluginGeocoder.geocode("190.226.155.134", (result) => {
  console.log(result);
});
