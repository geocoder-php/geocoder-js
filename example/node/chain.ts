/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";

const yandexGeocoder = GeocoderJS.createGeocoder("yandex");
const openStreetMapGeocoder = GeocoderJS.createGeocoder({
  provider: "openstreetmap",
  userAgent: "GeocoderJS Example",
});
const chainGeocoder = GeocoderJS.createGeocoder({
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
