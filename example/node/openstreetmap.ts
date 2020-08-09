/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";

const openStreetMapGeocoder = GeocoderJS.createGeocoder({
  provider: "openstreetmap",
  userAgent: "GeocoderJS Example",
});
openStreetMapGeocoder.geocode(
  "1600 Pennsylvania Ave NW, Washington, DC",
  (result) => {
    console.log(result);
  }
);

openStreetMapGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
