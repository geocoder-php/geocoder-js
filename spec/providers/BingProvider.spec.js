describe("Bing Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.BingProvider(new GeocoderJS.ExternalURILoader()),
    geocoded;

  var stubBingResult = {
    "__type": "Location:http://schemas.microsoft.com/search/local/ws/rest/v1",
    "bbox": [
      47.636186665473566,
      -122.13744013372656,
      47.64391210061492,
      -122.12215365108256
    ],
    "name": "1 Microsoft Way, Redmond, WA 98052",
    "point": {
      "type": "Point",
      "coordinates": [
        47.64004938304424,
        -122.12979689240456
      ]
    },
    "address": {
      "addressLine": "1 Microsoft Way",
      "adminDistrict": "WA",
      "adminDistrict2": "King Co.",
      "countryRegion": "United States",
      "formattedAddress": "1 Microsoft Way, Redmond, WA 98052",
      "locality": "Redmond",
      "postalCode": "98052"
    },
    "confidence": "High",
    "entityType": "Address",
    "geocodePoints": [
      {
        "type": "Point",
        "coordinates": [
          47.64004938304424,
          -122.12979689240456
        ],
        "calculationMethod": "InterpolationOffset",
        "usageTypes": [
          "Display"
        ]
      },
      {
        "type": "Point",
        "coordinates": [
          47.64006815850735,
          -122.12985791265965
        ],
        "calculationMethod": "Interpolation",
        "usageTypes": [
          "Route"
        ]
      }
    ],
    "matchCodes": [
      "Good"
    ]
  };

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubBingResult);
  });

  it ("receives results from the bing geocoder", function() {
    expect(geocoded).toBeDefined();
  });

  it ("maps coordinates correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([47.64004938304424, -122.12979689240456]);
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("1 Microsoft Way");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Redmond");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("WA");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("98052");
  });
});
