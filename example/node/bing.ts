/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";
import GeoJsonDumper from "../../dist/GeoJsonDumper";

const bingGeocoder = GeocoderJS.createGeocoder({
  provider: "bing",
  apiKey: "As11PsBXYvAoGEXmz59ZWl93T8_OACdXi2QnRKWMRIUK6hzOXgN3BcZHnbKyPZYo",
});
bingGeocoder.geocode("1600 Pennsylvania Ave NW, Washington, DC", (result) => {
  console.log(result);
  console.log("GeoJSON:", GeoJsonDumper.dump(result[0]));
});

bingGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
