![Universal Geocoder Logo](https://raw.githubusercontent.com/universal-geocoder/universal-geocoder-js/main/assets/logo.svg)

Universal Geocoder
==================

[![CI](https://img.shields.io/github/workflow/status/universal-geocoder/universal-geocoder-js/Continuous%20Integration?event=push)](https://github.com/universal-geocoder/universal-geocoder-js/actions)
[![codecov](https://img.shields.io/codecov/c/gh/universal-geocoder/universal-geocoder-js/main)](https://codecov.io/gh/universal-geocoder/universal-geocoder-js)

[![npm](https://img.shields.io/npm/v/universal-geocoder)](https://www.npmjs.com/package/universal-geocoder)
[![minified-size](https://img.shields.io/bundlephobia/min/universal-geocoder)](https://bundlephobia.com/result?p=universal-geocoder)
[![downloads](https://img.shields.io/npm/dw/universal-geocoder)](https://www.npmjs.com/package/universal-geocoder)

Universal Geocoder is a universal JavaScript library for client-side geocoding applications with multiple built-in providers.

Need geocoding 🌍️ in your website or application? Don't want to be vendor-locked to a service? ✨️ Universal Geocoder ✨️ is for you!

Depending of the chosen provider, it can use geocoding, reverse geocoding or IP geolocation.

Universal Geocoder is a TypeScript fork of [GeocoderJS](https://github.com/geocoder-php/geocoder-js), itself a port of the [Geocoder PHP](https://geocoder-php.org/) library.

This library is platform agnostic: it is available either server-side (**Node**) or client-side (**browsers**, **React Native**, **Electron**).

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

For this example, the output will be something like this:

```javascript
[
  NominatimGeocoded {
    coordinates: { latitude: 38.8976998, longitude: -77.03655348862276 },
    bounds: {
      latitudeSW: 38.8974898,
      longitudeSW: -77.0368542,
      latitudeNE: 38.897911,
      longitudeNE: -77.0362526
    },
    formattedAddress: undefined,
    streetNumber: '1600',
    streetName: 'Pennsylvania Avenue Northwest',
    subLocality: undefined,
    locality: 'Washington',
    postalCode: '20500',
    region: 'District of Columbia',
    adminLevels: [
      AdminLevel {
        level: 1,
        name: 'District of Columbia',
        code: undefined
      },
      AdminLevel {
        level: 2,
        name: 'Washington',
        code: undefined
      }
    ],
    country: 'United States of America',
    countryCode: 'us',
    timezone: undefined,
    displayName: 'White House, 1600, Pennsylvania Avenue Northwest, Washington, District of Columbia, 20500, United States of America',
    osmId: 238241022,
    osmType: 'way',
    category: 'historic',
    type: 'castle',
    attribution: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright'
  },
  // ... (other results)
]
```

If you want to use the library as a direct dependecy (for browsers only), copy `dist/universal-geocoder.js` or `dist/universal-geocoder.min.js` to your dependencies.

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
  provider: "googlemaps",
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
  coordinates: {
    latitude: "44.915",
    longitude: "-93.21",
  },
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
- `ip`: the IP searched
- `bounds` (object with `latitudeSW`, `longitudeSW`, `latitudeNE` and `longitudeNE` keys): the bounds to use (either bias or filter the results)
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

### Common `geodecode` parameters (`ReverseQuery` object)

- `coordinates` (object with `latitude`, `longitude` keys): the coordinates to search for
- `locale`: the locale to use for the query
- `limit`: the maximum number of results to have

### Common Result Properties (`Geocoded` object)

The result of a query is a `Geocoded` object which maps the following common information:
- Coordinates (object with `latitute` and `longitude` keys)
- Bounds (object with `latitudeSW`, `longitudeSW`, `latitudeNE`, `longitudeNE` keys)
- Formatted address
- Address details: street number, street name, (sub) locality, postal code, region, administration levels, country (with its code)
- Time zone

You can either use getter methods to retrieve them or use the `toObject` method to manipulate an object containing the properties.

Providers
---------

Universal Geocoder comes with modules to integrate with various geocoding providers.

The following table summarizes the features of each:

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Codename</th>
      <th>Supports location geocoding?</th>
      <th>Supports reverse geocoding?</th>
      <th>Supports IP geolocation?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenStreetMap (Nominatim)</td>
      <td>openstreetmap or nominatim</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>OpenCage</td>
      <td>opencage</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>Google Maps (Geocoding API)</td>
      <td>google or googlemaps</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>Mapbox</td>
      <td>mapbox</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>MapQuest</td>
      <td>mapquest</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>Bing</td>
      <td>bing</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>Yandex</td>
      <td>yandex</td>
      <td>✅️ yes</td>
      <td>✅️ yes</td>
      <td>❌️ no</td>
    </tr>
    <tr>
      <td>GeoPlugin</td>
      <td>geoplugin</td>
      <td>❌️ no</td>
      <td>❌️ no</td>
      <td>✅️ yes</td>
    </tr>
  </tbody>
</table>

### Specific Provider Usage

The documentation for specific provider options, parameters and results can be found [here](docs/provider_usage.md).

Special Providers
-----------------

A `chain` provider is available: it iterates over multiple providers.

For more information, see [its documentation](docs/provider_usage/chain.md).

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

Unit and functional tests are handled by Jasmine. To run tests from the command line, use:

```shell
npm test
```

If you need to record new API calls, use:

```shell
npm run test-record
```

You can also check if the examples are running correctly.

For the Web:

```shell
npm run serve
```

Then go to http://localhost:8080/example/web, choose a provider and open the console.

For Node:

```shell
npm run ts-node -- example/node/provider.ts
```
