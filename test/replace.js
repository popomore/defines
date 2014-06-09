'use strict';

require('should');
var fs = require('fs');
var join = require('path').join;
var defines = require('..');

var base = join(__dirname, 'fixtures');

describe('defines replace', function() {

  it('should cmd', function() {
    var code = fs.readFileSync(join(base, 'define-cmd.js'));
    var actual = defines(code, replace);

    function replace(args) {
      args.unshift(['./b', 'c']);
      args.unshift('a');
    }

    actual.should.startWith('define("a",["./b", "c"],');
  });

  it('should transport cmd', function() {
    var code = fs.readFileSync(join(base, 'define-transport-cmd.js'));
    var actual = defines(code, replace);

    function replace(args) {
      args[0] = 'b';
      args[1] = null;
    }

    actual.should.startWith('define("b",function(');
  });

});
