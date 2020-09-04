# MapQuest Usage

## Options

- `method` ("GET" or "POST", default: "GET"): the HTTP method to use when executing the query
- `openDomain` (default: false): boolean to use the Open Geocoding API (relies solely on data contributed to OpenStreetMap)

## `geocode` parameters

- `location`: use this parameter to use an advanced location. You can specify it using the MapQuest format or the Geocoded class or format.

## `Geocoded` properties

- `precision`: the quality of the geocoding result
- `precisionCode`: the quality code of the geocoding result
- `mapUrl`: the URL to a static map thumbnail image for the location being geocoded
- `attribution`: MapQuest copyright information
