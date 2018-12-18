'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _methods = require('./configs/methods');

Object.keys(_methods).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _methods[key];
    }
  });
});

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _route2.default;
