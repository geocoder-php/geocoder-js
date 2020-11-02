# OpenCage Usage

## Options

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)

## `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `proximity` (object with `latitude` and `longitude` keys): to provide a hint to bias results in favour of those closer to the specified location
- `minPrecision` (from 1 to 10): only results with at least this precision will be returned
- `noRecord`: boolean to ask for the query to not be logged

## `geodecode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `minPrecision` (from 1 to 10): only results with at least this precision will be returned
- `noRecord`: boolean to ask for the query to not be logged

## `Geocoded` properties

- `callingCode`: the international telephone calling code for the country of the result
- `flag`: emoji flag of the country of the result
- `mgrs`: Military Grid Reference System code for the center point of the result
- `maidenhead`: Maidenhead location reference for the center point of the result
- `geohash`: Geohash for the center point of the result
- `what3words`: key words whose value is a 3 words address (3wa)
