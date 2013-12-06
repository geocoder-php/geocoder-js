GeocoderJS
==========

**GeocoderJS** is a JavaScript port of the [Geocoder
PHP](http://geocoder-php.org/Geocoder/) library. It's meant as a compliment for
client-side geocoding applications.

[![Build
Status](https://travis-ci.org/geocoder-php/geocoder-js.png?branch=master)](https://travis-ci.org/geocoder-php/geocoder-js)

[![Dependency Status](https://david-dm.org/geocoder-php/geocoder-js.png)](https://david-dm.org/geocoder-php/geocoder-js)

[![devDependency Status](https://david-dm.org/geocoder-php/geocoder-js/dev-status.png)](https://david-dm.org/geocoder-php/geocoder-js#info=devDependencies)

Building
--------

You can build an uglified version of the script by running 'grunt build'.

Testing
-------

Unit tests are handled by Jasmine. To run unit tests from the command line, use 'grunt test'.

Contributing
------------

Contibution libraries are installed by Bower. Unit tests are covered by Jasmine.
Pull requests will **not** be accepted without:

* a) all unit/functional tests working
* b) any potentially effected example files still functional
* c) any additional functionality covered by unit/functional tests.

Providers
---------

GeocoderJS comes with modules to integrate with various geocoding providers.
The following table summarizes the features of each:

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Works in browsers?</th>
      <th>Works in Node.JS?</th>
      <th>Supports reverse geocoding?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Google Maps</td>
      <td>yes</td>
      <td>yes</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>Mapquest</td>
      <td>yes</td>
      <td>untested</td>
      <td>yes</td>
    </tr>
    <tr>
      <td>OpenStreetMap</td>
      <td>yes</td>
      <td>no</td>
      <td>yes</td>
    </tr>
  </tbody>
</table>

