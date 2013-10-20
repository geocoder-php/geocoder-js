if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  var useSSL = false;

  GeocoderJS.GoogleAPIProvider = function(_useSSL) {
    useSSL = _useSSL;
  };

  GeocoderJS.GoogleAPIProvider.prototype = new GeocoderJS.ProviderBase();
  GeocoderJS.GoogleAPIProvider.prototype.constructor = GeocoderJS.GoogleAPIProvider;

  GeocoderJS.GoogleAPIProvider.prototype.geocode = function(searchString, callback) {
    this.executeRequest({"address": searchString}, callback);
  };

  GeocoderJS.GoogleAPIProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.executeRequest({"latlng": latitude + "," + longitude}, callback);
  };

  GeocoderJS.GoogleAPIProvider.prototype.executeRequest = function(params, callback) {
    if (typeof XMLHttpRequest !== "undefined") {
      return executeDOMRequest(params, callback);
    }

    try {
      var url = require("url"),
        http = useSSL ? require("https") : require("http");
      return executeNodeRequest(params, callback);
    }
    catch (err) {
      // Intentionally empty.
    }

    return callback(null);
  };

  GeocoderJS.GoogleAPIProvider.prototype.mapToGeocoded = function(result) {
    var geocoded = new GeocoderJS.Geocoded();
    geocoded.latitude = result.geometry.location.lat;
    geocoded.longitude = result.geometry.location.lng;

    for (var i in result.address_components) {
      for (var j in result.address_components[i].types) {
        switch (result.address_components[i].types[j]) {
          case "street_number":
            geocoded.streetNumber = result.address_components[i].long_name;
            break;
          case "route":
            geocoded.streetName = result.address_components[i].long_name;
            break;
          case "locality":
            geocoded.city = result.address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            geocoded.region = result.address_components[i].long_name;
            break;
          case "postal_code":
            geocoded.postal_code = result.address_components[i].long_name;
            break;
        }
      }
    }
    return geocoded;
  };

  function executeNodeRequest(params, callback) {
    var url = require("url"),
      http = useSSL ? require("https") : require("http"),
      urlObj = {
        "protocol": useSSL ? "https" : "http",
        "host": "maps.googleapis.com",
        "pathname": "maps/api/geocode/json",
        "query": params
      },
      requestUrl;

    urlObj.query.sensor = "false";
    requestUrl = url.format(urlObj);

    http.get(requestUrl, function(res) {
      if (res.statusCode != 200) {
        throw("Received HTTP status code " + res.statusCode + " when attempting geocoding request.");
      }

      res.data = "";
      res.setEncoding("utf8");

      res.on("data", function (chunk) {
        res.data += chunk;
      });

      res.on("end", function () {
        if (!res.data || !res.data.length) {
          throw("Received empty data when attempting geocoding request.");
        }

        var data = false,
          i = 0,
          results = [];
        try {
          data = JSON.parse(res.data);
        }
        catch(e) {
          throw("Received invalid JSON data when attempting geocoding request.");
        }

        if (data && data.status) {
          if (data.status === "OVER_QUERY_LIMIT") {
            throw("Exceeded daily quota when attempting geocoding request.");
          }
          else if (data.status === "OK" && data.results) {
            for (; i < data.results.length; i++) {
              results.push(GeocoderJS.GoogleAPIProvider.prototype.mapToGeocoded(data.results[i]));
            }
            return callback(results);
          }
        }

        throw("Received unexpected JSON data when attempting geocoding request.");
      });
    }).on("error", function(err) {
      throw(err);
    });
  }

  function executeDOMRequest(params, callback) {
    var req = new XMLHttpRequest(),
      requestUrl = (useSSL ? "https" : "http") + "://maps.googleapis.com/maps/api/geocode/json?sensor=false&";

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        requestUrl += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      }
    }

    req.onload = function () {
      if (this.status != 200) {
        console.log("Received HTTP status code " + this.status + " when attempting geocoding request.");
        return callback(null);
      }

      if (!this.responseText || !this.responseText.length) {
        console.log("Received empty data when attempting geocoding request.");
        return callback(null);
      }

      var data = false,
        i = 0,
        results = [];
      try {
        data = JSON.parse(this.responseText);
      }
      catch(e) {
        console.log("Received invalid JSON data when attempting geocoding request.");
        return callback(null);
      }

      if (data && data.status) {
        if (data.status === "OVER_QUERY_LIMIT") {
          console.log("Exceeded daily quota when attempting geocoding request.");
          return callback(null);
        }
        else if (data.status === "OK" && data.results) {
          for (; i < data.results.length; i++) {
            results.push(GeocoderJS.GoogleAPIProvider.prototype.mapToGeocoded(data.results[i]));
          }
          return callback(results);
        }
      }

      console.log("Received unexpected JSON data when attempting geocoding request.");
      return callback(null);
    };

    req.open("GET", requestUrl);
    req.send();
  }

})(GeocoderJS);
