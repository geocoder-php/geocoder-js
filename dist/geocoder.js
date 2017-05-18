if (function() {
    "use strict";
    var a = {};
    a.version = "0.0.0", a.createGeocoder = function(b) {
        return new a.ProviderFactory().createProvider(b);
    }, ("object" == typeof window ? window : "object" == typeof exports ? exports : {}).GeocoderJS = a;
}(), "function" == typeof define && define.amd && define(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) var GeocoderJS = require("../GeocoderJS.js");

if (function(a) {
    "use strict";
    a.ProviderBase = function() {}, a.ProviderBase.prototype = {
        geocode: function(a, b) {},
        geodecode: function(a, b, c) {},
        mapToGeocoded: function(a) {},
        executeRequest: function(a, b) {}
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) var GeocoderJS = require("./GeocoderJS.js");

if (function(a) {
    "use strict";
    a.Geocoded = function() {
        this.other = {};
    }, a.Geocoded.prototype = {
        getCoordinates: function() {
            return [ this.latitude, this.longitude ];
        },
        getLatitude: function() {
            return this.latitude;
        },
        getLongitude: function() {
            return this.longitude;
        },
        getBounds: function() {
            return this.bounds;
        },
        getStreetNumber: function() {
            return this.streetNumber;
        },
        getStreetName: function() {
            return this.streetName;
        },
        getCity: function() {
            return this.city;
        },
        getZipcode: function() {
            return this.postal_code;
        },
        getCityDistrict: function() {},
        getCounty: function() {
            return this.countryName;
        },
        getCountyCode: function() {
            return this.country_code;
        },
        getRegion: function() {
            return this.region;
        },
        getOther: function() {
            return this.other;
        }
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) var GeocoderJS = require("./GeocoderJS.js");

if (function(a) {
    "use strict";
    var b = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Point",
            coordinates: []
        }
    };
    a.GeoJSONDumper = function() {
        return {
            dump: function(a) {
                var c = b;
                return c.geometry.coordinates = [ a.getLongitude(), a.getLatitude() ], c;
            }
        };
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) {
    var GeocoderJS = require("../GeocoderJS.js");
    require("../ExternalURILoader.js");
}

if (function(a) {
    "use strict";
    a.ProviderFactory = function() {}, a.ProviderFactory.prototype.createProvider = function(b) {
        "string" == typeof b && (b = {
            provider: b
        });
        var c, d = new a.ExternalURILoader();
        switch (b.provider) {
          case "google":
            c = new a.GoogleAPIProvider(d, b);
            break;

          case "mapquest":
            c = new a.MapquestProvider(d, b);
            break;

          case "openstreetmap":
            c = new a.OpenStreetMapProvider(d, b);
            break;

          case "bing":
            c = new a.BingProvider(d, b);
            break;

          case "yandex":
            c = new a.YandexProvider(d, b);
        }
        return c;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) var GeocoderJS = require("../GeocoderJS.js");

if (function(a, b) {
    "use strict";
    function c(a) {
        var c = Date.now(), d = "jsonp" + Math.round(c + 1000001 * Math.random());
        return b[d] = function(c) {
            a(c), delete b[d];
        }, d;
    }
    a.ExternalURILoader = function(a) {
        this.options = {}, void 0 === a && (a = {}), this.setOptions(a);
    }, a.ExternalURILoader.prototype.setOptions = function(a) {
        var b = {
            protocol: null,
            host: null,
            pathname: null
        };
        for (var c in b) this.options[c] = void 0 !== a[c] ? a[c] : b[c];
    }, a.ExternalURILoader.prototype.executeRequest = function(b, d) {
        function e(b, c) {
            var d, e = require("url"), f = require(g.options.protocol), h = {
                protocol: g.options.protocol,
                host: g.options.host,
                pathname: g.options.pathname,
                query: b
            };
            d = e.format(h), f.get(d, function(b) {
                if (200 != b.statusCode) throw "Received HTTP status code " + b.statusCode + " when attempting geocoding request.";
                b.data = "", b.setEncoding("utf8"), b.on("data", function(a) {
                    b.data += a;
                }), b.on("end", function() {
                    if (!b.data || !b.data.length) throw "Received empty data when attempting geocoding request.";
                    var d = !1, e = 0, f = [];
                    try {
                        d = JSON.parse(b.data);
                    } catch (a) {
                        throw "Received invalid JSON data when attempting geocoding request.";
                    }
                    if (d && d.status) {
                        if ("OVER_QUERY_LIMIT" === d.status) throw "Exceeded daily quota when attempting geocoding request.";
                        if ("OK" === d.status && d.results) {
                            for (;e < d.results.length; e++) f.push(a.GoogleAPIProvider.prototype.mapToGeocoded(d.results[e]));
                            return c(f);
                        }
                    }
                    throw "Received unexpected JSON data when attempting geocoding request.";
                });
            }).on("error", function(a) {
                throw a;
            });
        }
        function f(a, b) {
            var d, e = new XMLHttpRequest(), f = g.options.protocol + "://" + g.options.host + "/" + g.options.pathname + "?", h = [];
            a.JSONPCallback && (d = a.JSONPCallback, delete a.JSONPCallback, a[d] = c(b));
            for (var i in a) a.hasOwnProperty(i) && h.push(i + "=" + a[i]);
            if (f += h.join("&"), d) {
                var j = document.createElement("script");
                j.src = f, document.getElementsByTagName("head")[0].appendChild(j);
            } else e.onload = function() {
                if (200 != this.status) return console.log("Received HTTP status code " + this.status + " when attempting geocoding request."), 
                b(null);
                if (!this.responseText || !this.responseText.length) return console.log("Received empty data when attempting geocoding request."), 
                b(null);
                var a = !1;
                try {
                    a = JSON.parse(this.responseText);
                } catch (a) {
                    return console.log("Received invalid JSON data when attempting geocoding request."), 
                    b(null);
                }
                return a ? b(a) : (console.log("Received unexpected JSON data when attempting geocoding request."), 
                b(null));
            }, e.open("GET", f), e.send();
        }
        var g = this;
        if ("undefined" != typeof XMLHttpRequest) return f(b, d);
        try {
            require("url");
            return e(b, d);
        } catch (a) {}
        return d(null);
    };
}(GeocoderJS, window), void 0 === GeocoderJS && "function" == typeof require) {
    var GeocoderJS = require("../GeocoderJS.js");
    require("../Geocoded.js"), require("../providers/ProviderBase.js");
}

if (function(a) {
    "use strict";
    var b, c;
    a.BingProvider = function(a, d) {
        if (void 0 === a) throw "No external loader defined.";
        this.externalLoader = a, d = d || {}, b = !!d.useSSL && d.useSSL, (c = d.apiKey ? d.apiKey : null) && (b = !0);
    }, a.BingProvider.prototype = new a.ProviderBase(), a.BingProvider.prototype.constructor = a.BingProvider, 
    a.BingProvider.prototype.geocode = function(a, d) {
        this.externalLoader.setOptions({
            protocol: !0 === b ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + a
        });
        var e = {
            key: c,
            JSONPCallback: "jsonp"
        };
        this.executeRequest(e, d);
    }, a.BingProvider.prototype.geodecode = function(a, d, e) {
        this.externalLoader.setOptions({
            protocol: !0 === b ? "https" : "http",
            host: "dev.virtualearth.net",
            pathname: "REST/v1/Locations/" + a + "," + d
        });
        var f = {
            key: c,
            JSONPCallback: "jsonp"
        };
        this.executeRequest(f, e);
    }, a.BingProvider.prototype.executeRequest = function(a, b) {
        var c = this;
        this.externalLoader.executeRequest(a, function(a) {
            var d = [];
            for (var e in a.resourceSets[0].resources) d.push(c.mapToGeocoded(a.resourceSets[0].resources[e]));
            b(d);
        });
    }, a.BingProvider.prototype.mapToGeocoded = function(b) {
        var c = new a.Geocoded();
        return c.latitude = b.point.coordinates[0], c.longitude = b.point.coordinates[1], 
        c.streetName = b.address.addressLine, c.city = b.address.locality, c.region = b.address.adminDistrict, 
        c.postal_code = b.address.postalCode, c;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) {
    var GeocoderJS = require("../GeocoderJS.js");
    require("../Geocoded.js"), require("../providers/ProviderBase.js");
}

if (function(a) {
    "use strict";
    var b, c;
    a.GoogleAPIProvider = function(a, d) {
        if (void 0 === a) throw "No external loader defined.";
        this.externalLoader = a, d = d || {}, b = !!d.useSSL && d.useSSL, (c = d.apiKey ? d.apiKey : null) && (b = !0);
    }, a.GoogleAPIProvider.prototype = new a.ProviderBase(), a.GoogleAPIProvider.prototype.constructor = a.GoogleAPIProvider, 
    a.GoogleAPIProvider.prototype.geocode = function(a, d) {
        this.externalLoader.setOptions({
            protocol: !0 === b ? "https" : "http",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json"
        });
        var e = {
            sensor: !1,
            address: a
        };
        c && (e.key = c), this.executeRequest(e, d);
    }, a.GoogleAPIProvider.prototype.geodecode = function(a, d, e) {
        this.externalLoader.setOptions({
            protocol: b ? "https" : "http",
            host: "maps.googleapis.com",
            pathname: "maps/api/geocode/json"
        });
        var f = {
            sensor: !1,
            latlng: a + "," + d
        };
        c && (f.key = c), this.executeRequest(f, e);
    }, a.GoogleAPIProvider.prototype.executeRequest = function(a, b) {
        var c = this;
        this.externalLoader.executeRequest(a, function(a) {
            var d = [];
            for (var e in a.results) d.push(c.mapToGeocoded(a.results[e]));
            b(d);
        });
    }, a.GoogleAPIProvider.prototype.mapToGeocoded = function(b) {
        var c = new a.Geocoded();
        c.latitude = b.geometry.location.lat, c.longitude = b.geometry.location.lng;
        for (var d in b.address_components) for (var e in b.address_components[d].types) switch (b.address_components[d].types[e]) {
          case "street_number":
            c.streetNumber = b.address_components[d].long_name;
            break;

          case "route":
            c.streetName = b.address_components[d].long_name;
            break;

          case "locality":
            c.city = b.address_components[d].long_name;
            break;

          case "administrative_area_level_1":
            c.region = b.address_components[d].long_name;
            break;

          case "postal_code":
            c.postal_code = b.address_components[d].long_name;
        }
        return c;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) var GeocoderJS = require("../GeocoderJS.js");

if (function(a) {
    "use strict";
    a.MapquestProvider = function(a, b) {
        if (void 0 === a) throw "No external loader defined.";
        this.externalLoader = a, "object" != typeof b && (b = {});
        var c = {
            apiKey: ""
        };
        for (var d in c) void 0 === b[d] && (b[d] = c[d]);
        this.apiKey = b.apiKey;
    }, a.MapquestProvider.prototype = new a.ProviderBase(), a.MapquestProvider.prototype.constructor = a.MapquestProvider, 
    a.MapquestProvider.prototype.geocode = function(a, b) {
        this.externalLoader.setOptions({
            protocol: "http",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/address"
        });
        var c = {
            key: this.apiKey,
            outputFormat: "json",
            location: encodeURIComponent(a),
            JSONPCallback: "callback"
        };
        this.executeRequest(c, b);
    }, a.MapquestProvider.prototype.geodecode = function(a, b, c) {
        this.externalLoader.setOptions({
            protocol: "http",
            host: "www.mapquestapi.com",
            pathname: "geocoding/v1/reverse"
        });
        var d = {
            key: this.apiKey,
            outputFormat: "json",
            JSONPCallback: "callback",
            location: a + "," + b
        };
        this.executeRequest(d, c);
    }, a.MapquestProvider.prototype.mapToGeocoded = function(b) {
        var c = new a.Geocoded();
        return c.latitude = b.latLng.lat, c.longitude = b.latLng.lng, c.city = b.adminArea5, 
        c.region = b.adminArea4, c.streetName = b.street, c.postal_code = b.postalCode, 
        c;
    }, a.MapquestProvider.prototype.executeRequest = function(a, b) {
        var c = this;
        this.externalLoader.executeRequest(a, function(a) {
            var d = [];
            if (a.results[0].locations.length) for (var e in a.results[0].locations) d.push(c.mapToGeocoded(a.results[0].locations[e]));
            b(d);
        });
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) {
    var GeocoderJS = require("../GeocoderJS.js");
    require("../Geocoded.js"), require("../ExternalURILoader.js"), require("../providers/ProviderBase.js");
}

if (function(a) {
    "use strict";
    a.OpenStreetMapProvider = function(a) {
        if (void 0 === a) throw "No external loader defined.";
        this.externalLoader = a;
    }, a.OpenStreetMapProvider.prototype = new a.ProviderBase(), a.OpenStreetMapProvider.prototype.constructor = a.OpenStreetMapProvider, 
    a.OpenStreetMapProvider.prototype.geocode = function(a, b) {
        this.externalLoader.setOptions({
            protocol: "http",
            host: "nominatim.openstreetmap.org",
            pathname: "search"
        });
        var c = {
            format: "json",
            q: a,
            addressdetails: 1
        };
        this.executeRequest(c, b);
    }, a.OpenStreetMapProvider.prototype.geodecode = function(a, b, c) {
        this.externalLoader.setOptions({
            protocol: "http",
            host: "nominatim.openstreetmap.org",
            pathname: "reverse"
        });
        var d = {
            format: "json",
            lat: a,
            lon: b,
            addressdetails: 1,
            zoom: 18
        };
        this.executeRequest(d, c);
    }, a.OpenStreetMapProvider.prototype.executeRequest = function(a, b) {
        var c = this;
        this.externalLoader.executeRequest(a, function(a) {
            var d = [];
            if (a.length) for (var e in a) d.push(c.mapToGeocoded(a[e])); else d.push(c.mapToGeocoded(a));
            b(d);
        });
    }, a.OpenStreetMapProvider.prototype.mapToGeocoded = function(b) {
        var c = new a.Geocoded();
        return c.latitude = 1 * b.lat, c.longitude = 1 * b.lon, c.streetNumber = void 0 !== b.address.house_number ? b.address.house_number : void 0, 
        c.streetName = b.address.road, c.city = b.address.city, c.region = b.address.state, 
        c.postal_code = b.address.postcode, c;
    };
}(GeocoderJS), void 0 === GeocoderJS && "function" == typeof require) {
    var GeocoderJS = require("../GeocoderJS.js");
    require("../Geocoded.js"), require("../providers/ProviderBase.js");
}

!function(a) {
    "use strict";
    function b(a) {
        var b, d, e, f = [ "Envelope" ];
        for (e in f) if (f.hasOwnProperty(e) && (b = f[e], a.hasOwnProperty(b))) {
            d = a[b];
            break;
        }
        switch (b) {
          case "Envelope":
            return c(d);
        }
    }
    function c(a) {
        var b, c, d, e, f, g, h;
        return c = a.upperCorner, b = a.lowerCorner, h = b.split(" "), e = 1 * h[0], d = 1 * h[1], 
        h = c.split(" "), g = 1 * h[0], f = 1 * h[1], [ [ d, e ], [ f, g ] ];
    }
    var d;
    a.YandexProvider = function(a, b) {
        if (void 0 === a) throw "No external loader defined.";
        this.externalLoader = a, b = b || {}, d = !!b.useSSL && b.useSSL, this.lang = b.lang ? b.lang : "en-US";
    }, a.YandexProvider.prototype = new a.ProviderBase(), a.YandexProvider.prototype.constructor = a.YandexProvider, 
    a.YandexProvider.prototype.geocode = function(a, b) {
        this.externalLoader.setOptions({
            protocol: !0 === d ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x"
        });
        var c = {
            format: "json",
            geocode: a,
            JSONPCallback: "callback",
            lang: this.lang
        };
        this.executeRequest(c, b);
    }, a.YandexProvider.prototype.geodecode = function(a, b, c) {
        this.externalLoader.setOptions({
            protocol: !0 === d ? "https" : "http",
            host: "geocode-maps.yandex.ru",
            pathname: "1.x"
        });
        var e = {
            format: "json",
            geocode: b + "," + a,
            JSONPCallback: "callback",
            lang: this.lang
        };
        this.executeRequest(e, c);
    }, a.YandexProvider.prototype.executeRequest = function(a, b) {
        var c = this;
        this.externalLoader.executeRequest(a, function(a) {
            var d = [];
            for (var e in a.response.GeoObjectCollection.featureMember) d.push(c.mapToGeocoded(a.response.GeoObjectCollection.featureMember[e].GeoObject));
            b(d);
        });
    }, a.YandexProvider.prototype.mapToGeocoded = function(c) {
        var d, e, f, g, h, i, j, k, l = new a.Geocoded();
        if (e = c.Point.pos.split(" "), l.latitude = 1 * e[1], l.longitude = 1 * e[0], k = b(c.boundedBy), 
        k && (l.bounds = k), !c.metaDataProperty.GeocoderMetaData) return l;
        f = c.metaDataProperty.GeocoderMetaData, g = f.Address.Components, f.AddressDetails.Country && (l.country_code = f.AddressDetails.Country.CountryNameCode);
        for (h in g) if (g.hasOwnProperty(h)) switch (d = g[h], i = d.kind, j = d.name, 
        i) {
          case "country":
            l.countryName = j;
            break;

          case "locality":
            l.city = j;
            break;

          case "province":
            l.region = j;
            break;

          case "area":
            l.region_area = j;
            break;

          case "street":
            l.streetName = j;
            break;

          case "house":
            l.streetNumber = j;
            break;

          default:
            l.other[i] = j;
        }
        return console.log(l), l;
    };
}(GeocoderJS);