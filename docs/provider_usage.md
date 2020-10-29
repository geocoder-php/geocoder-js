# Specific Provider Usage

Each provider has its own options, parameters or results because of its specific features.

- [Chain (special provider)](provider_usage/chain.md)
- [OpenStreetMap (Nominatim)](provider_usage/nominatim.md)
- [OpenCage](provider_usage/opencage.md)
- [Google Maps (Geocoding API)](provider_usage/googlemaps.md)
- [Mapbox](provider_usage/mapbox.md)
- [MapQuest](provider_usage/mapquest.md)
- [Yandex](provider_usage/yandex.md)
- [GeoPlugin](provider_usage/geoplugin.md)

Here is a table listing the parameters according to the providers:

<table>
  <thead>
    <tr>
      <th>Option, Method or Result</th>
      <th>Parameter</th>
      <th>Description</th>
      <th>Provider</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>option</td>
      <td>countryCodes</td>
      <td>Restrict the results to one or more countries</td>
      <td>Google Maps, Mapbox, OpenCage</td>
    </tr>
    <tr>
      <td>option</td>
      <td>method</td>
      <td>HTTP method to use when executing the query</td>
      <td>MapQuest</td>
    </tr>
    <tr>
      <td>option</td>
      <td>clientId</td>
      <td>To use a client ID instead of the API key</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>option</td>
      <td>secret</td>
      <td>URL signing secret to use to digitally sign the request</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>option</td>
      <td>geocodingMode</td>
      <td>Geocoding mode to use</td>
      <td>Mapbox</td>
    </tr>
    <tr>
      <td>option</td>
      <td>openDomain</td>
      <td>To use the Open Geocoding API</td>
      <td>MapQuest</td>
    </tr>
    <tr>
      <td>option</td>
      <td>userAgent</td>
      <td>User-Agent identifying your application</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>option</td>
      <td>referer</td>
      <td>Referer for the request</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>option</td>
      <td>host</td>
      <td>Host to use</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>countryCodes</td>
      <td>Restrict the results to one or more countries</td>
      <td>Google Maps, Mapbox, Nominatim, OpenCage</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>bounded</td>
      <td>Restrict the results to items within the bounds</td>
      <td>Nominatim, Yandex</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>proximity</td>
      <td>Bias or filter the response to favor results that are closer to the specified location</td>
      <td>Mapbox, OpenCage, Yandex</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>fuzzyMatch</td>
      <td>Should approximate the request terms or do an exact matching</td>
      <td>Mapbox</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>span</td>
      <td>Bias or filter the response to favor results that are closer to the specified span</td>
      <td>Yandex</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>minConfidence</td>
      <td>Only results with at least this confidence will be returned</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>components</td>
      <td>Filter the results by components</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>locationTypes</td>
      <td>Filter the results to a subset of location types</td>
      <td>Mapbox</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>excludePlaceIds</td>
      <td>For excluding some locations from the results</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>skip</td>
      <td>Number of items to skip in the response</td>
      <td>Yandex</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>noRecord</td>
      <td>Ask for the query to not be logged</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocode</td>
      <td>channel</td>
      <td>Channel to use for the request</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>countryCodes</td>
      <td>Restrict the results to one or more countries</td>
      <td>Mapbox, OpenCage</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>minConfidence</td>
      <td>Only results with at least this confidence will be returned</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>locationTypes</td>
      <td>Filter the results by location types</td>
      <td>Google Maps, Mapbox, Yandex</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>resultTypes</td>
      <td>Filter the results by address types</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>zoom</td>
      <td>Level of details required for the address</td>
      <td>Npminatim</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>reverseMode</td>
      <td>How results are sorted</td>
      <td>Mapbox</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>skip</td>
      <td>Number of items to skip in the response</td>
      <td>Yandex</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>noRecord</td>
      <td>Ask for the query to not be logged</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geodecode</td>
      <td>channel</td>
      <td>Channel to use for the request</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>attribution</td>
      <td>Credit information</td>
      <td>GeoPlugin, MapQuest, Nominatim</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>precision</td>
      <td>Quality of the geocoding result</td>
      <td>MapQuest, Yandex</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>precisionCode</td>
      <td>Quality code of the geocoding result</td>
      <td>MapQuest</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>callingCode</td>
      <td>International telephone calling code for the country of the result</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>placeId</td>
      <td>Unique identifier for the location</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>osmId</td>
      <td>Reference to the OpenStreetMap object</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>osmType</td>
      <td>Reference to the OpenStreetMap object</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>mapUrl</td>
      <td>URL to a static map thumbnail image for the location being geocoded</td>
      <td>MapQuest</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>partialMatch</td>
      <td>Indicate the geocoder did not return an exact match</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>resultType</td>
      <td>Result types</td>
      <td>Google Maps, Mapbox</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>locationType</td>
      <td>Type representing the precision of the result</td>
      <td>Google Maps, Yandex</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>streetAddress</td>
      <td>Street number with the street name</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>displayName</td>
      <td>Full comma-separated address</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>category</td>
      <td>Category of the location</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>type</td>
      <td>Type of the location</td>
      <td>Nominatim</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>subLocalityLevels</td>
      <td>Levels for the sublocality</td>
      <td>Google Maps</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>flag</td>
      <td>Emoji flag of the country of the result</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>mgrs</td>
      <td>Military Grid Reference System code for the center point of the result</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>maidenhead</td>
      <td>Maidenhead location reference for the center point of the result</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>geohash</td>
      <td>Geohash for the center point of the result</td>
      <td>OpenCage</td>
    </tr>
    <tr>
      <td>geocoded</td>
      <td>what3words</td>
      <td>Key words whose value is a 3 words address (3wa)</td>
      <td>OpenCage</td>
    </tr>
  </tbody>
</table>
