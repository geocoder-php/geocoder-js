# Changelog

## 0.8.0

* [Bing] Better Bing provider
* [Mapbox] Add `fuzzyMatch` geocode parameter
* [OpenCage] Add `precision` to `OpenCageGeocoded`
* [OpenCage] Replace `minConfidence` with `minPrecision` for geocode and geodecode

## 0.7.0

* [Yandex] Better Yandex provider
* [Nominatim] Remove `viewBox` parameter in `GeocodeQuery` to use `bounds` instead
* [GeoJsonDumper] Use `bbox` member for `bounds`
* The `bounds` parameter in `GeocodeQuery` is now an object with `latitudeSW`, `longitudeSW`, `latitudeNE`, `longitudeNE` keys
* The `latitude` and `longitude` parameters in `GeocodeQuery` are replaced by a `coordinates` parameter (an object with `latitude` and `longitude` keys)
* `Geocoded` returns an object with `latitudeSW`, `longitudeSW`, `latitudeNE`, `longitudeNE` keys for the `bounds`
* The `latitude` and `longitude` parameters in `Geocoded` are replaced by a `coordinates` parameter (an object with `latitude` and `longitude` keys)

## 0.6.0

* [MapQuest] Better MapQuest provider

## 0.5.0

* Add special chain provider
* Add GeoPlugin provider
* Add `errorCallback` parameter to `geocode` and `geodecode`
* Add `body` parameter to `executeRequest`
* [MapQuest] Fix geocode request (bad encoded query)

## 0.4.0

* [Google] Better Google Maps provider
* [Nominatim] Better handling of geodecode errors
* [ExternalLoader] Add `getOptions` method to interface
* [ExternalLoader] Rename `JSONPCallback` in params to `jsonpCallback`
* Rename `GoogleAPIProvider` to `GoogleMapsProvider`
* Add Node examples

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
