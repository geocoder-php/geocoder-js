# Changelog

## 0.3.0

* Add OpenCage Provider
* Add time zone to `Geocoded`
* [Mapbox] Add `countryCodes`, `proximity` and `reverseMode` to geo(de)code parameters
* [Mapbox] Add `resultType` to `Geocoded`
* [Mapbox] Add admin levels to `Geocoded`
* Rename `ExternalURILoader` to `ExternalLoader`

## 0.2.4

* [Nominatim] Fix error when no result is received

## 0.2.3

* Fix TypeScript types for the library to be usable in a TS project

## 0.2.2

* Use relative paths for build files

## 0.2.1

* Missing types folder when publishing

## 0.2.0

* Better Nominatim support
* Better GeoJSON support

## 0.1.0

* Library rewritten in TypeScript
* Library can be used as a module as well
* Add Mapbox provider
* Formatted address, bounds and country support
* Better handling of provider options (JSONP, SSL)
* The methods `geocode` and `geodecode` can take an object or a `Query`
