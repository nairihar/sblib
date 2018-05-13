'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = exports.parseOptions = exports.queryParams = undefined;

var _configs = require('../configs');

var queryParams = exports.queryParams = function queryParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var query = Object.keys(params).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
  return query;
};

var parseOptions = exports.parseOptions = function parseOptions(_ref) {
  var method = _ref.method,
      headers = _ref.headers,
      url = _ref.url,
      data = _ref.data,
      queryData = _ref.queryData;

  var parsedUrl = url;
  var query = void 0,
      body = void 0;

  if (method === _configs.methods.GET) {
    query = queryParams(queryData);
    parsedUrl += '?' + query;
  } else {
    body = JSON.stringify(data);
  }
  var options = {
    parsedUrl: parsedUrl,
    requestOptions: {
      method: method,
      body: body,
      headers: headers
    }
  };
  return options;
};

var parseResponse = exports.parseResponse = async function parseResponse(response) {
  // TODO :: add error message handling and status codes
  var data = await response.json();
  return data;
};