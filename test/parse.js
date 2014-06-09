'use strict';

require('should');
var fs = require('fs');
var join = require('path').join;
var defines = require('..');

var base = join(__dirname, 'fixtures');

describe('defines parse', function() {

  it('should cmd', function() {
    var code = fs.readFileSync(join(base, 'define-cmd.js')).toString();
    var actual = defines(code);
    actual.should.eql([{
      string: 'define(function(require, module, exports) {})',
      args: ['function(require, module, exports) {}']
    }]);
  });


  it('should transport cmd', function() {
    var code = fs.readFileSync(join(base, 'define-transport-cmd.js'));
    var actual = defines(code);
    actual.should.eql([{
      string: 'define(\'a\', [\'./b\', \'c\'], function(require, module, exports) {\n})',
      args: [
        'a',
        ['./b', 'c'],
        'function(require, module, exports) {\n}'
      ]
    }]);
  });

  it('should define in closure', function() {
    var code = fs.readFileSync(join(base, 'define-in-closure.js'));
    var actual = defines(code);
    actual.should.eql([{
      string: 'define(function(require, exports, module){\n      module.exports = detector;\n    })',
      args: [
        'function(require, exports, module){\n      module.exports = detector;\n    }'
      ]
    }]);
  });

  it('should amd', function() {
    var code = fs.readFileSync(join(base, 'define-amd.js'));
    var actual = defines(code);
    actual.should.eql([{
      string: 'define([\n  "./arr"\n], function( arr ) {\n  return arr.push;\n})',
      args: [
        ['./arr'],
        'function( arr ) {\n  return arr.push;\n}'
      ]
    }]);
  });
});
