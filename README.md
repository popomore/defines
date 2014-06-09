# defines [![Build Status](https://travis-ci.org/popomore/defines.png?branch=master)](https://travis-ci.org/popomore/defines) [![Coverage Status](https://coveralls.io/repos/popomore/defines/badge.png?branch=master)](https://coveralls.io/r/popomore/defines?branch=master) 

Lookup all define in js file.

---

## Install

```
$ npm install defines -g
```

## Usage

```
var defines = require('defines');
defines(fs.readFileSync('a.js'));
```

yeild

```
[
  {
    string: 'define(function(){})',
    args: [
      [function]
    ]
  },
  {
    string: 'define([\'./a\', \'./b\'], function(a, b){})',
    args: [
      ['./a', './b'],
      [function]
    ]
  }
]
```

replace

```
var code = fs.readFileSync('a.js');
defines(code, function(args) {
  if (args.length === 1) {
    args.unshift('deps');
    args.unshift('id');
  }
});
```

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
