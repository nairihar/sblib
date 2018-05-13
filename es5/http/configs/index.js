'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = exports.defaults = undefined;

var _defaults = require('./defaults');

Object.defineProperty(exports, 'defaults', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_defaults).default;
  }
});

var _methods = require('./methods');

var methods = _interopRequireWildcard(_methods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.methods = methods;