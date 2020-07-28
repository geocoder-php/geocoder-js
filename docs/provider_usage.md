# Specific Provider Usage

## OpenStreetMap (Nominatim)

### Options

- `userAgent` (required if default host): a User-Agent identifying your application is needed to use Nominatim (see https://operations.osmfoundation.org/policies/nominatim/)
- `referer`: if you want to set a Referer as well
- `host` (default: "nominatim.openstreetmap.org"): to use another host

### `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `excludePlaceIds`: for excluding some OpenStreetMap objects from the results
- `viewBox` ([longitude 1, latitude 1, longitude 2, latitude 2]): the preferred area to find search results
- `bounded` (only if `viewBox` is used): boolean to restrict the results to items within the view box

### `geodecode` parameters

- `zoom` (default: 18, from 0 to 18): the level of details required for the address

### `Geocoded` properties

- `displayName`: full comma-separated address
- `osmId`, `osmType`: reference to the OpenStreetMap object
- `category`, `type`: key and value of the main OpenStreetMap tag
- `attribution`: OpenStreetMap licensing information

## OpenCage

### Options

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)

### `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `proximity`: to provide a hint to bias results in favour of those closer to the specified location
- `minConfidence` (from 1 to 10): only results with at least this confidence will be returned
- `noRecord`: boolean to ask for the query to not be logged

### `geodecode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `minConfidence` (from 1 to 10): only results with at least this confidence will be returned
- `noRecord`: boolean to ask for the query to not be logged

### `Geocoded` properties

- `callingCode`: the international telephone calling code for the country of the result
- `flag`: emoji flag of the country of the result
- `mgrs`: Military Grid Reference System code for the center point of the result
- `maidenhead`: Maidenhead location reference for the center point of the result
- `geohash`: Geohash for the center point of the result
- `what3words`: key words whose value is a 3 words address (3wa)

## Mapbox

### Options

- `geocodingMode` (default: "mapbox.places"): the geocoding mode to use
- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)

### `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `proximity`: to bias the response to favor results that are closer to the specified location
- `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types

### `geodecode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `reverseMode` ("distance" or "score", default: "distance"): how results are sorted
- `locationTypes` (possible values: "country", "region", "postcode", "district", "place", "locality", "neighborhood", "address", "poi"): to filter the results to a subset of location types

### `Geocoded` properties

- `resultType`: an array of result types

## Yandex

### Options

- `toponym`: the type of toponym ("house", "street", "metro", "district", "locality")
