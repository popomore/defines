'use strict';

require('should');
var fs = require('fs');
var join = require('path').join;
var defines = require('..');

var base = join(__dirname, 'fixtures');

describe('defines', function() {

  it('should has define', function() {
    defines.hasDefine().should.be.false;
    defines.hasDefine(null).should.be.false;
    defines.hasDefine('').should.be.false;

    var code = fs.readFileSync(join(base, 'define-in-closure.js'));
    defines.hasDefine(code).should.be.true;

    code = fs.readFileSync(join(base, 'define-transport-cmd.js')).toString();
    defines.hasDefine(code).should.be.true;
  });

});
