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

module.exports.hasDefine = hasDefine;

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
  var count = 0;
  return falafel(code, function(node) {
    if(!isDefine(node)) return;

    var args = parseArgs(node);
    fn(args, count);
    update(node, args);
    count++;
  }).toString();
}

function update(node, args) {
  args = args.map(function(arg) {
    if (arg === '') return '';
    if (isString(arg) && !isFunction(arg)) {
      return '"' + toString(arg) + '"';
    }
    return toString(arg);
  }).filter(function(arg) {
    return !!arg;
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

function hasDefine(code) {
  if (!code) return false;

  if (Buffer.isBuffer(code)) {
    code = code.toString();
  }

  return code.indexOf('define(') !== -1;
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

  return str.toString();
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
