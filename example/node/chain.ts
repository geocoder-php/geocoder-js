/* eslint-disable no-console */
import UniversalGeocoder from "../../dist/UniversalGeocoder";

const yandexGeocoder = UniversalGeocoder.createGeocoder("yandex");
const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
  provider: "openstreetmap",
  userAgent: "Universal Geocoder Example",
});
const chainGeocoder = UniversalGeocoder.createGeocoder({
  provider: "chain",
  providers: [yandexGeocoder, openStreetMapGeocoder],
  parallelize: true,
});

chainGeocoder.geocode("1600 Pennsylvania Ave, Washington, DC", (result) => {
  console.log(result);
});

chainGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
