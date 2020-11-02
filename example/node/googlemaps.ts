/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";

const googleGeocoder = GeocoderJS.createGeocoder({
  provider: "googlemaps",
  useSsl: true,
});
googleGeocoder.geocode("1600 Pennsylvania Ave, Washington, DC", (result) => {
  console.log(result);
});

googleGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
