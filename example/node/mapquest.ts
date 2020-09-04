/* eslint-disable no-console */
import GeocoderJS from "../../dist/GeocoderJS";
import Geocoded from "../../dist/Geocoded";
import { MapQuestGeocodeQuery, MapQuestLocation } from "../../dist/provider";

let mapQuestGeocoder = GeocoderJS.createGeocoder({
  provider: "mapquest",
  apiKey: "Fmjtd|luurnu6al1,bg=o5-9wbg94",
});
mapQuestGeocoder.geocode(
  "1600 Pennsylvania Ave NW, Washington, DC",
  (result) => {
    console.log(result);
  }
);

mapQuestGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});

mapQuestGeocoder.geocode(
  MapQuestGeocodeQuery.create({
    location: Geocoded.create({
      streetNumber: 1600,
      streetName: "Pennsylvania Ave NW",
      locality: "Washington",
    }),
  }),
  (result) => {
    console.log(result);
  }
);

mapQuestGeocoder = GeocoderJS.createGeocoder({
  provider: "mapquest",
  apiKey: "Fmjtd|luurnu6al1,bg=o5-9wbg94",
  method: "POST",
  openDomain: true,
});
mapQuestGeocoder.geocode(
  "1600 Pennsylvania Ave NW, Washington, DC",
  (result) => {
    console.log(result);
  }
);

mapQuestGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});

mapQuestGeocoder.geocode(
  MapQuestGeocodeQuery.create({
    location: MapQuestLocation.create({
      street: "1600 Pennsylvania Ave NW",
      city: "Washington",
    }),
  }),
  (result) => {
    console.log(result);
  }
);
