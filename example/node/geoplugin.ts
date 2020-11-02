/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";

const geoPluginGeocoder = GeocoderJS.createGeocoder({
  provider: "geoplugin",
});
geoPluginGeocoder.geocode("190.226.155.134", (result) => {
  console.log(result);
});
