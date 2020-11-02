# Mapbox Usage

## Options

- `geocodingMode` (default: "mapbox.places"): the geocoding mode to use
- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)

## `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `proximity` (object with `latitude` and `longitude` keys): to bias the response to favor results that are closer to the specified location
- `fuzzyMatch`: to approximate the request terms or do an exact matching
- `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types

## `geodecode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `reverseMode` ("distance" or "score", default: "distance"): how results are sorted
- `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types

## `Geocoded` properties

- `resultType`: an array of result types
