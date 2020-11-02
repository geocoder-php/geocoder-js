# Yandex Usage

## `geocode` parameters

- `bounded` (only if `bounds` or `proximity` is used): boolean to restrict the results to items within the bounds
- `proximity` (object with `latitude` and `longitude` keys): center of the search area
- `span` (object with `spanLatitude` and `spanLongitude` keys): span of the search area
- `skip`: the number of items to skip in the response

## `geodecode` parameters

- `locationTypes` (possible values: "house", "street", "metro", "district", "locality", ...): to filter the results by location types
- `skip`: the number of items to skip in the response

## `Geocoded` properties

- `locationType`: the type of location
- `precision`: the quality of the geocoding result
