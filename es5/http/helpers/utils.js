'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLastSlashSymbol = exports.isObject = exports.isNotEmptyString = exports.isRequestMethod = undefined;

var _configs = require('../configs');

var isRequestMethod = exports.isRequestMethod = function isRequestMethod(method) {
  var isMethod = false;
  Object.keys(_configs.methods).forEach(function (methodName) {
    if (method === _configs.methods[methodName]) {
      isMethod = true;
    }
  });
  return isMethod;
};

var isNotEmptyString = exports.isNotEmptyString = function isNotEmptyString(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  return true;
};

var isObject = exports.isObject = function isObject(value) {
  return value instanceof Object;
};

var removeLastSlashSymbol = exports.removeLastSlashSymbol = function removeLastSlashSymbol(string) {
  if (string[string.length - 1] === '/') return string.slice(0, -1);
  return string;
};