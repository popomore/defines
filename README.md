# defines [![Build Status](https://travis-ci.org/popomore/defines.png?branch=master)](https://travis-ci.org/popomore/defines) [![Coverage Status](https://coveralls.io/repos/popomore/defines/badge.png?branch=master)](https://coveralls.io/r/popomore/defines?branch=master) 

Lookup all define in js file and replace it.

---

## Install

```
$ npm install defines -g
```

## Usage

Javascript file

```
define(function(){});

define(['./a', './b'], function(a, b){});
```

Get defines with code below

```
var defines = require('defines');
defines(fs.readFileSync('a.js'));
```

yield

```
[
  {
    string: 'define(function(){})',
    args: [
      'function(){}'
    ]
  },
  {
    string: 'define(["./a", "./b"], function(a, b){})',
    args: [
      ['./a', './b'],
      'function(a, b){}'
    ]
  }
]
```

Replace it with code below

```
var code = fs.readFileSync('a.js');
defines(code, function(args, index) {
  if (index === 0) {
    args.unshift('a');
  }
});
```

yield

```
define('a', function(){});

define(['./a', './b'], function(a, b){});
```

Detect if it contains `define`

```
var code = fs.readFileSync('a.js');
defines.hasDefine(code);
```

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
