[![view on npm](http://img.shields.io/npm/v/handlebars-fileset.svg)](https://www.npmjs.org/package/handlebars-fileset)
[![npm module downloads per month](http://img.shields.io/npm/dm/handlebars-fileset.svg)](https://www.npmjs.org/package/handlebars-fileset)
[![Dependency Status](https://david-dm.org/75lb/handlebars-fileset.svg)](https://david-dm.org/75lb/handlebars-fileset)

handlebars-fileset
==================
Access to [file-set](https://github.com/75lb/file-set) from Handlebars.

##Install
```sh
$ npm install handlebars-fileset
```

##Usage
```js
var handlebars = require("handlebars");
var handlebarsFileset = require("handlebars-fileset");

/* this will register the handlebars-fileset helpers on your handlebars instance */
handlebarsFileset(handlebars);
```

###Examples
```
{{#each fileset("*.md").files}}
filename: {{this}}
{{/each}}
```
