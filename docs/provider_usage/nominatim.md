# OpenStreetMap (Nominatim) Usage

## Options

- `userAgent` (required if default host): a User-Agent identifying your application is needed to use Nominatim (see https://operations.osmfoundation.org/policies/nominatim/)
- `referer`: if you want to set a Referer as well
- `host` (default: "nominatim.openstreetmap.org"): to use another host

## `geocode` parameters

- `countryCodes`: to restrict the results to one or more countries (ISO 3166 alpha 2 country codes)
- `excludePlaceIds`: for excluding some OpenStreetMap objects from the results
- `viewBox` ([longitude 1, latitude 1, longitude 2, latitude 2]): the preferred area to find search results
- `bounded` (only if `viewBox` is used): boolean to restrict the results to items within the view box

## `geodecode` parameters

- `zoom` (default: 18, from 0 to 18): the level of details required for the address

## `Geocoded` properties

- `displayName`: full comma-separated address
- `osmId`, `osmType`: reference to the OpenStreetMap object
- `category`, `type`: key and value of the main OpenStreetMap tag
- `attribution`: OpenStreetMap licensing information
