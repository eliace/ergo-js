[![view on npm](http://img.shields.io/npm/v/handlebars-path.svg)](https://www.npmjs.org/package/handlebars-path)
![npm module downloads per month](http://img.shields.io/npm/dm/handlebars-path.svg)
[![Dependency Status](https://david-dm.org/75lb/handlebars-path.svg)](https://david-dm.org/75lb/handlebars-path)

handlebars-path
===============
Handlebars helper mappings for the node.js [path module](http://nodejs.org/api/path.html). Works server and client-side (using browserify).

* path-normalize
* path-join
* path-resolve
* path-relative
* path-basename
* path-extname

##Install
```sh
$ npm install handlebars-path
```

##Usage
```js
var handlebars = require("handlebars");
var handlebarsPath = require("handlebars-path");

/* this will register the handlebars-path helpers on your handlebars instance */
handlebarsPath(handlebars);
```

###Examples
the template
```
Filename: {{path-basename "parsnip.veg" ".veg"}}.txt
```
returns
```
Filename: parsnip.txt
```
