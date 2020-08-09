/* eslint-disable no-console */
import UniversalGeocoder from "../../dist/UniversalGeocoder";

const openCageGeocoder = UniversalGeocoder.createGeocoder({
  provider: "opencage",
});
openCageGeocoder.geocode(
  "1600 Pennsylvania Ave NW, Washington, DC",
  (result) => {
    console.log(result);
  }
);

openCageGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
