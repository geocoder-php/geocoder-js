# Google Maps (Geocoding API) Usage

## Options

- `countryCodes`: to restrict the results to one or more countries (ccTLD country codes)
- `clientId`: to use a client ID instead of the API key (Premium only)
- `secret`: the URL signing secret to use to digitally sign the request (Premium only and only server-side)

## `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ccTLD country codes)
- `components` (array of objects with `name` and `value` properties): to filter the results by components
- `channel`: channel to use for this request (Premium only)

## `geodecode` parameters

- `resultTypes`: to filter the results by address types
- `locationTypes` (possible values: "ROOFTOP", "RANGE_INTERPOLATED", "GEOMETRIC_CENTER", "APPROXIMATE"): to filter the results by location types
- `channel`: channel to use for this request (Premium only)

## `Geocoded` properties

- `placeId`: a unique identifier used with other Google APIs
- `partialMatch`: to indicate the geocoder did not return an exact match
- `resultType`: an array of result types
- `locationType`: a type representing the precision of the result
- `streetAddress`: the street number with the street name
- `intersection`, `political`, `colloquialArea`, `ward`, `neighborhood`, `premise`, `subpremise`, `naturalFeature`, `airport`, `park`, `pointOfInterest`, `establishment`, `postalCodeSuffix`: additional address components
- `subLocalityLevels`: levels for the sublocality
