'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configs = require('../configs');

var _helpers = require('../helpers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _privates = new WeakMap();
var addRoute = Symbol('addRoute');
var setPath = Symbol('setPath');
var syncRoutes = Symbol('syncRoutes');

var Route = function () {
  function Route(_ref) {
    var name = _ref.name,
        address = _ref.address,
        routes = _ref.routes;

    _classCallCheck(this, Route);

    if (!(0, _helpers.isNotEmptyString)(name)) throw 'Pleae specify correct name';
    if (!(0, _helpers.isNotEmptyString)(address)) throw 'Pleae specify correct address';
    var slicedAddress = (0, _helpers.removeLastSlashSymbol)(address);
    var _state = {
      name: name,
      address: slicedAddress,
      method: _configs.methods.POST,
      routeNames: [],
      timeout: _configs.defaults.timeout,
      messages: _configs.defaults.messages,
      headers: _configs.defaults.headers,
      params: []
    };
    if ((0, _helpers.isNotEmptyString)(routes)) {
      _state.routes = {};
      _state.path = routes;
    } else if ((0, _helpers.isObject)(routes)) {
      _state.routes = routes;
      _state.path = routes.defaults || _configs.defaults.path;
    } else {
      throw 'Pleae specify correct routes';
    }
    _privates.set(this, _state);
    this[addRoute]();
  }

  /* getters */


  _createClass(Route, [{
    key: 'getAddress',
    value: function getAddress() {
      var _privates$get = _privates.get(this),
          address = _privates$get.address;

      return address;
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      var _privates$get2 = _privates.get(this),
          address = _privates$get2.address,
          path = _privates$get2.path;

      if (!address) return null;
      var url = '' + address + path;
      return url;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var _privates$get3 = _privates.get(this),
          path = _privates$get3.path;

      return path;
    }
  }, {
    key: 'getName',
    value: function getName() {
      var _privates$get4 = _privates.get(this),
          name = _privates$get4.name;

      return name;
    }
  }, {
    key: 'getTimeout',
    value: function getTimeout() {
      var _privates$get5 = _privates.get(this),
          timeout = _privates$get5.timeout;

      return timeout;
    }
  }, {
    key: 'getMethod',
    value: function getMethod() {
      var _privates$get6 = _privates.get(this),
          method = _privates$get6.method;

      return method;
    }
  }, {
    key: 'getMessages',
    value: function getMessages() {
      var _privates$get7 = _privates.get(this),
          messages = _privates$get7.messages;

      return messages;
    }
  }, {
    key: 'getHeaders',
    value: function getHeaders() {
      var _privates$get8 = _privates.get(this),
          headers = _privates$get8.headers;

      return headers;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      var name = this.getName();
      var address = this.getAddress();
      var path = this.getPath();
      var method = this.getMethod();
      var timeout = this.getTimeout();
      var url = this.getUrl();
      var messages = this.getMessages();
      var headers = this.getHeaders();
      var info = {
        name: name,
        address: address,
        path: path,
        method: method,
        timeout: timeout,
        url: url,
        messages: messages,
        headers: headers
      };
      return info;
    }

    /* setters */

  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      var _state = _privates.get(this);
      _state.timeout = timeout;
      _privates.set(this, _state);
      this[syncRoutes]('setTimeout', timeout);
      return this;
    }
  }, {
    key: setPath,
    value: function value(path) {
      var _state = _privates.get(this);
      _state.path = path;
      _privates.set(this, _state);
    }
  }, {
    key: 'setAddress',
    value: function setAddress(address) {
      if (!address) throw 'Please set correct address';
      var _state = _privates.get(this);
      var _address = (0, _helpers.removeLastSlashSymbol)(address);
      _state.address = _address;
      _privates.set(this, _state);
      this[syncRoutes]('setAddress', address);
      return this;
    }
  }, {
    key: 'setMethod',
    value: function setMethod(method) {
      if (!(0, _helpers.isRequestMethod)(method)) throw 'Method is not valid';
      var _state = _privates.get(this);
      _state.method = method;
      _privates.set(this, _state);
      this[syncRoutes]('setMethod', method);
      return this;
    }
  }, {
    key: 'setMessages',
    value: function setMessages(messages) {
      var _state = _privates.get(this);
      _state.messages = messages;
      _privates.set(this, _state);
      this[syncRoutes]('setMessages', messages);
      return this;
    }
  }, {
    key: 'setHeaders',
    value: function setHeaders(headers) {
      var _state = _privates.get(this);
      _state.headers = headers;
      _privates.set(this, _state);
      this[syncRoutes]('setHeaders', headers);
      return this;
    }

    /* other methods */

  }, {
    key: addRoute,
    value: function value() {
      var _this = this;

      var _state = _privates.get(this);
      var routes = _state.routes;

      var routeNames = Object.keys(routes);
      _state.routeNames = routeNames;
      routeNames.forEach(function (routeName) {
        _this[routeName] = new Route({
          name: routeName,
          address: _state.address,
          routes: routes[routeName]
        });
      });
    }
  }, {
    key: syncRoutes,
    value: function value(method, _value) {
      var _this2 = this;

      var _privates$get9 = _privates.get(this),
          routeNames = _privates$get9.routeNames;

      routeNames.forEach(function (routeName) {
        _this2[routeName][method](_value);
      });
    }
  }, {
    key: 'param',
    value: function param() {
      var _state = _privates.get(this);

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      _state.params = [].concat(_toConsumableArray(_state.params), params);
      _privates.set(this, _state);
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _state = _privates.get(this);
      // TODO :: do request
      _state.params = [];
      _privates.set(this, _state);
    }
  }]);

  return Route;
}();

exports.default = Route;