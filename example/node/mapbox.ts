/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";

const mapboxGeocoder = GeocoderJS.createGeocoder({ provider: "mapbox" });
mapboxGeocoder.geocode("1600 Pennsylvania Ave NW, Washington, DC", (result) => {
  console.log(result);
});

mapboxGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
