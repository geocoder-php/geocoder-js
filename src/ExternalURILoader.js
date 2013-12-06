/**
 * GeocoderJS.ExternalURILoader
 * - Used to load data from external geocoding engines.
 */

if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
  "use strict";

  // @TODO: Tmp useSSL variable, left over from older implementation. Use setting (or //example.com style urls) instead.
  var useSSL = false;

  GeocoderJS.ExternalURILoader = function(options) {
    this.options = {};

    // @TODO: remove and add a throw if no options are passed.
    if (options === undefined) {
      options = {};
    }

    this.setOptions(options);
  };

  GeocoderJS.ExternalURILoader.prototype.setOptions = function(options) {
    var defaults = {
      protocol: null,
      host: null,
      pathname: null
    };

    for (var i in defaults) {
      this.options[i] = (options[i] !== undefined) ? options[i] : defaults[i];
    }
  };

  GeocoderJS.ExternalURILoader.prototype.executeRequest = function(params, callback) {
    var _this = this;
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

    function executeNodeRequest(params, callback) {
      var url = require("url"),
        http = useSSL ? require("https") : require("http"),
        urlObj = {
          "protocol": useSSL ? "https" : "http",
          "host": _this.options.host,
          "pathname": _this.options.pathname,
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
        requestUrl = "//" + _this.options.host + "/" + _this.options.pathname + "?";

      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          requestUrl += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
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

        if (data) {
          return callback(data);
        }

        console.log("Received unexpected JSON data when attempting geocoding request.");
        return callback(null);
      };

      req.open("GET", requestUrl);
      req.send();
    }

  };

})(GeocoderJS);
