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
      <th>Works in browsers?</th>
      <th>Works in Node?</th>
      <th>Supports reverse geocoding?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Google API</td>
      <td>yes</td>
      <td>yes</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>OpenStreetMap (Nominatim)</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Mapbox</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>MapQuest</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Bing</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Yandex</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
  </tbody>
</table>

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
