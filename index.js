'use strict';

var vm = require('vm');
var falafel = require('falafel');

module.exports = function(code, fn) {
  if (Buffer.isBuffer(code)) {
    code = code.toString();
  }

  if (fn) return replace(code, fn);

  return parse(code);
};

function parse(code) {
  var ret = [];
  falafel(code, function(node) {
    if(!isDefine(node)) return;

    ret.push({
      string: node.source(),
      args: parseArgs(node)
    });
  });
  return ret;
}

function replace(code, fn) {
  return falafel(code, function(node) {
    if(!isDefine(node)) return;

    var args = parseArgs(node);
    fn(args);
    update(node, args);
  }).toString();
}

function update(node, args) {
  args = args.map(function(arg) {
    if (isString(arg) && !isFunction(arg)) {
      return '"' + toString(arg) + '"';
    }
    return toString(arg);
  });
  node.update('define(' + args + ');');
}

function parseArgs(node) {
  var args = node.arguments;
  return args.map(function(arg) {
    var str = arg.source();
    if (isFunction(str)) {
      return str;
    }
    return vm.runInThisContext(str);
  });
}

function toString(str) {
  if (str === null || str === undefined) {
    return '';
  }

  if (Array.isArray(str)) {
    return '[' + str.map(function(item) {
      return '"' + toString(item) + '"';
    }).join(', ') + ']';
  }

  if (isObject(str)) {
    return JSON.stringfy(str);
  }

  return (str.toString || Object.prototype.toString).call(str);
}

function isDefine(node) {
  var callee = node.callee;
  return callee &&
    node.type === 'CallExpression' &&
    callee.type === 'Identifier' &&
    callee.name === 'define';
}

function isFunction(str) {
  return /function\s*\(/.test(str);
}

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

function isObject(str) {
  return Object.prototype.toString.call(str) === '[object Object]';
}

