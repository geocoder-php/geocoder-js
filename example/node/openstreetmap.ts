/* eslint-disable no-console */
import UniversalGeocoder from "../../dist/UniversalGeocoder";

const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
  provider: "openstreetmap",
  userAgent: "Universal Geocoder Example",
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
