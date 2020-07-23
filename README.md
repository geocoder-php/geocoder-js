Universal Geocoder
==================

[![Build Status](https://travis-ci.com/alanpoulain/universal-geocoder.png?branch=main)](https://travis-ci.com/alanpoulain/universal-geocoder)

Universal Geocoder is a universal JavaScript library for client-side geocoding applications with multiple built-in providers.

Need geocoding 🌍️ in your website or application? Don't want to be vendor-locked to a service? ✨️ Universal Geocoder ✨️ is for you!

Universal Geocoder is a TypeScript fork of [GeocoderJS](https://github.com/geocoder-php/geocoder-js), itself a port of the [Geocoder PHP](https://geocoder-php.org/) library.

This library is platform agnostic: it is available either server-side (Node) or client-side (browsers, React Native).

Installation
------------

Add the library to your project:

```shell
npm install --save universal-geocoder
```

> ⚠️ **Warning**: If you need to use this library in an environment not supporting the Promise API such as Internet Explorer, you must install an ES6 Promise compatible polyfill like [es6-promise](https://github.com/jakearchibald/es6-promise).

Usage
-----

You can either use Universal Geocoder as a module or as a direct dependency.

As a module:

```javascript
import UniversalGeocoder from "universal-geocoder";

const openStreetMapGeocoder = UniversalGeocoder.createGeocoder("openstreetmap");

openStreetMapGeocoder.geocode("1600 Pennsylvania Ave NW, Washington, DC", (result) => {
  console.log(result);
});
```

If you want to use the library as a direct dependecy, copy `dist/universal-geocoder.js` or `dist/universal-geocoder.min.js` to your dependencies.

Universal Geocoder will be available in the global environment:

```javascript
const openStreetMapGeocoder = UniversalGeocoder.createGeocoder("openstreetmap");

openStreetMapGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
```

For a more advanced usage, see the example below:

```javascript
import UniversalGeocoder, { ReverseQuery } from "universal-geocoder";

const googleGeocoder = UniversalGeocoder.createGeocoder({
  provider: "google",
  apiKey: "YOUR_API_KEY",
  useSsl: true,
  useJsonp: false,
  // other specific provider options
});

googleGeocoder.geocode({
  text: "1600 Pennsylvania Ave, Washington, DC",
  locale: "FR",
  limit: 10,
  // other specific provider parameters
}, (result) => {
  console.log(result);
});

const reverseQuery = ReverseQuery.create({
  latitude: "44.915",
  longitude: "-93.21",
})
.withLocale("FR")
.withLimit(7);
googleGeocoder.geodecode(reverseQuery, (result) => {
  console.log(result);
});
```

### Common Options (`createGeocoder` method)

- `useSsl`: boolean to use the HTTPS API of the providers
- `useJsonp`: boolean to use JSONP
- `apiKey`: the API key to use for the provider

### Common `geocode` parameters (`GeocodeQuery` object)

- `text`: what is searched
- `south`, `west`, `north`, `east` (`withBounds` method): the bounds to use
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

### Common `geodecode` parameters (`ReverseQuery` object)

- `latitude`, `longitude` (`withCoordinates` method): the coordinates to search for
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

### Common Result Properties (`Geocoded` object)

The result of a query is a `Geocoded` object which maps the following common information:
- Coordinates (latitute and longitude)
- Bounds (south, west, north, east)
- Formatted address
- Address details: street number, street name, (sub) locality, postal code, region, administration levels, country (with its code)

You can either use getter methods to retrieve them or use the `toObject` method to manipulate an object containing the properties.

Providers
---------

Universal Geocoder comes with modules to integrate with various geocoding providers.

The following table summarizes the features of each:

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Name</th>
      <th>Works in browsers?</th>
      <th>Works in Node?</th>
      <th>Supports reverse geocoding?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenStreetMap (Nominatim)</td>
      <td>openstreetmap or nominatim</td>
      <td>✅️ yes</td>
      <td>❓️ untested</td>
      <td>✅️ yes</td>
    </tr>
    <tr>
      <td>Google API</td>
      <td>google</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
    </tr>
    <tr>
      <td>Mapbox</td>
      <td>mapbox</td>
      <td>✅️ yes</td>
      <td>❓️ untested</td>
      <td>✅️ yes</td>
    </tr>
    <tr>
      <td>MapQuest</td>
      <td>mapquest</td>
      <td>✅️ yes</td>
      <td>❓️ untested</td>
      <td>✅️ yes</td>
    </tr>
    <tr>
      <td>Bing</td>
      <td>bing</td>
      <td>✅️ yes</td>
      <td>❓️ untested</td>
      <td>✅️ yes</td>
    </tr>
    <tr>
      <td>Yandex</td>
      <td>yandex</td>
      <td>✅️ yes</td>
      <td>❓️ untested</td>
      <td>✅️ yes</td>
    </tr>
  </tbody>
</table>

### Specific Provider Usage

The documentation for specific provider options, parameters and results can be found [here](docs/provider_usage.md).

Dumpers
-------

Dumpers transform a `Geocoded` object to another format.

### GeoJSON

[GeoJSON](https://geojson.org/) is a format for encoding a variety of geographic data structures.

#### Usage

```javascript
import UniversalGeocoder, { GeoJsonDumper } from "universal-geocoder";

const nominatimGeocoder = UniversalGeocoder.createGeocoder("nominatim");

nominatimGeocoder.geocode("1600 Pennsylvania Ave, Washington, DC", (result) => {
  console.log(result);
  console.log("GeoJSON:", GeoJsonDumper.dump(result[0]));
});
```

Building
--------

```shell
npm run build
```

Testing
-------

Unit tests are handled by Jasmine. To run unit tests from the command line, use:

```shell
npm test
```

You can also check if the examples are running correctly:

```shell
npm run serve
```

Then go to http://localhost:8080/example, choose a provider and open the console.
