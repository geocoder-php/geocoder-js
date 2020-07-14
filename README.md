GeocoderJS
==========

[![Build Status](https://travis-ci.org/geocoder-php/geocoder-js.png?branch=master)](https://travis-ci.org/geocoder-php/geocoder-js)
[![Dependency Status](https://david-dm.org/geocoder-php/geocoder-js.png)](https://david-dm.org/geocoder-php/geocoder-js)
[![devDependency Status](https://david-dm.org/geocoder-php/geocoder-js/dev-status.png)](https://david-dm.org/geocoder-php/geocoder-js#info=devDependencies)

GeocoderJS is a universal JavaScript library for client-side geocoding applications with multiple built-in providers.

It is a port of the [Geocoder PHP](https://geocoder-php.org/) library.

This library is platform agnostic: it is available either server-side (Node) or client-side (browsers, React Native).

Installation
------------

Add the library to your project:

```shell
npm install --save geocoder-js
```

> ⚠️ **Warning**: If you need to use this library in an environment not supporting the Promise API such as Internet Explorer, you must install an ES6 Promise compatible polyfill like [es6-promise](https://github.com/jakearchibald/es6-promise).

Usage
-----

You can either use GeocoderJS as a module or as a direct dependency.

As a module:

```javascript
import GeocoderJS from "geocoder-js";

const openStreetMapGeocoder = GeocoderJS.createGeocoder("openstreetmap");

openStreetMapGeocoder.geocode("1600 Pennsylvania Ave NW, Washington, DC", (result) => {
  console.log(result);
});
```

If you want to use the library as a direct dependecy, copy `dist/geocoder.js` or `dist/geocoder.min.js` to your dependencies.

GeocoderJS will be available in the global environment:

```javascript
const openStreetMapGeocoder = GeocoderJS.createGeocoder("openstreetmap");

openStreetMapGeocoder.geodecode("44.915", "-93.21", (result) => {
  console.log(result);
});
```

For a more advanced usage, see the example below:

```javascript
import GeocoderJS, { ReverseQuery } from "geocoder-js";

const googleGeocoder = GeocoderJS.createGeocoder({
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

Providers
---------

GeocoderJS comes with modules to integrate with various geocoding providers.

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

### Usage

#### Common Options (`createGeocoder` method)

- `useSsl`: boolean to use the HTTPS API of the providers
- `useJsonp`: boolean to use JSONP
- `apiKey`: the API key to use for the provider

#### Common `geocode` parameters (`GeocodeQuery` object)

- `text`: what is searched
- `south`, `west`, `north`, `east` (`withBounds` method): the bounds to use
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

#### Common `geodecode` parameters (`ReverseQuery` object)

- `latitude`, `longitude` (`withCoordinates` method): the coordinates to search for
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

#### Common Result Properties (`Geocoded` object)

The result of a query is a `Geocoded` object which maps the following common information:
- Coordinates (latitute and longitude)
- Bounds (south, west, north, east)
- Formatted address
- Address details: street number, street name, (sub) locality, postal code, region, administration levels, country (with its code)

You can either use getter methods to retrieve them or use the `toObject` method to manipulate an object containing the properties.

#### Specific Provider Usage

<details>
  <summary><b>OpenStreetMap (Nominatim)</b></summary>

  ##### Options

  - `userAgent` (required if default host): a User-Agent identifying your application is needed to use Nominatim (see https://operations.osmfoundation.org/policies/nominatim/)
  - `referer`: if you want to set a Referer as well
  - `host` (default: "nominatim.openstreetmap.org"): to use another host

  ##### `geocode` parameters

  - `countryCodes`: a list of country codes to limit the results to one or more countries
  - `excludePlaceIds`: for excluding some OpenStreetMap objects from the results
  - `viewBox` ([longitude 1, latitude 1, longitude 2, latitude 2]): the preferred area to find search results
  - `bounded` (only if `viewBox` is used): boolean to restrict the results to items within the view box

  ##### `geodecode` parameters

  - `zoom` (default: 18, from 0 to 18): the level of details required for the address

  ##### `Geocoded` properties

  - `displayName`: full comma-separated address
  - `osmId`, `osmType`: reference to the OpenStreetMap object
  - `category`, `type`: key and value of the main OpenStreetMap tag
  - `attribution`: OpenStreetMap licensing information
</details>

<details>
  <summary><b>Mapbox</b></summary>

  ##### Options

  - `geocodingMode` (default: "mapbox.places"): the geocoding mode to use
  - `country`: to limit the results to one or more countries (ISO 3166 alpha 2 country codes separated by commas)

  ##### `geocode` parameters

  - `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types

  ##### `geodecode` parameters

  - `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types
</details>

<details>
  <summary><b>Yandex</b></summary>

  ##### Options

  - `toponym`: the type of toponym ("house", "street", "metro", "district", "locality")
</details>

Dumpers
-------

Dumpers transform a `Geocoded` object to another format.

### GeoJSON

[GeoJSON](https://geojson.org/) is a format for encoding a variety of geographic data structures.

<details>
  <summary>Usage</summary>

  ```javascript
  import GeocoderJS, { GeoJsonDumper } from "geocoder-js";

  const nominatimGeocoder = GeocoderJS.createGeocoder("nominatim");

  nominatimGeocoder.geocode("1600 Pennsylvania Ave, Washington, DC", (result) => {
    console.log(result);
    console.log("GeoJSON:", GeoJsonDumper.dump(result[0]));
  });
  ```
</details>

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
