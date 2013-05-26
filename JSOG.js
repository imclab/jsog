// Generated by CoffeeScript 1.6.2
(function() {
  var JSOG, nextId;

  JSOG = {};

  nextId = 1;

  JSOG.encode = function(original) {
    var doEncode, idOf, sofar;

    sofar = {};
    idOf = function(obj) {
      if (!obj.__jsogObjectId) {
        obj.__jsogObjectId = "" + (nextId++);
      }
      return obj.__jsogObjectId;
    };
    doEncode = function(original) {
      var encodeArray, encodeObject;

      encodeObject = function(original) {
        var id, key, result, value;

        id = idOf(original);
        if (sofar[id]) {
          return {
            '@ref': id
          };
        }
        result = sofar[id] = {
          '@id': id
        };
        for (key in original) {
          value = original[key];
          if (key !== '__jsogObjectId') {
            result[key] = doEncode(value);
          }
        }
        return result;
      };
      encodeArray = function(original) {
        var val;

        return (function() {
          var _i, _len, _results;

          _results = [];
          for (_i = 0, _len = original.length; _i < _len; _i++) {
            val = original[_i];
            _results.push(encode(val));
          }
          return _results;
        })();
      };
      if (Array.isArray(original)) {
        return encodeArray(original);
      } else if (typeof original === 'object') {
        return encodeObject(original);
      } else {
        return original;
      }
    };
    return doEncode(original);
  };

  JSOG.decode = function(encoded) {
    var doDecode, found;

    found = {};
    doDecode = function(encoded) {
      var decodeArray, decodeObject;

      decodeObject = function(encoded) {
        var id, key, ref, result, value;

        ref = encoded['@ref'];
        if (ref != null) {
          ref = ref.toString();
        }
        if (ref != null) {
          return found[ref];
        }
        result = {};
        id = encoded['@id'];
        if (id != null) {
          id = id.toString();
        }
        if (id) {
          found[id] = result;
        }
        for (key in encoded) {
          value = encoded[key];
          if (key !== '@id') {
            result[key] = doDecode(value);
          }
        }
        return result;
      };
      decodeArray = function(encoded) {
        var result, value, _i, _len;

        result = [];
        for (_i = 0, _len = encoded.length; _i < _len; _i++) {
          value = encoded[_i];
          result.push(decode(value));
        }
        return result;
      };
      if (Array.isArray(encoded)) {
        return decodeArray(encoded);
      } else if (typeof encoded === 'object') {
        return decodeObject(encoded);
      } else {
        return encoded;
      }
    };
    return doDecode(encoded);
  };

  JSOG.stringify = function(obj) {
    return JSON.stringify(JSOG.encode(obj));
  };

  JSOG.parse = function(str) {
    return JSOG.decode(JSON.parse(str));
  };

  if (module && module.exports) {
    module.exports = JSOG;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.JSOG = JSOG;
  }

}).call(this);
