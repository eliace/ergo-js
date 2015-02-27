[![view on npm](http://img.shields.io/npm/v/config-master.svg)](https://www.npmjs.org/package/config-master)
[![npm module downloads per month](http://img.shields.io/npm/dm/config-master.svg)](https://www.npmjs.org/package/config-master)
[![Build Status](https://travis-ci.org/75lb/config-master.svg?branch=master)](https://travis-ci.org/75lb/config-master)
[![Dependency Status](https://david-dm.org/75lb/config-master.svg)](https://david-dm.org/75lb/config-master)


#config-master
Merges together JSON data from the specified files, in the specified order. Designed for app config management.



- ...jsonPath `string` the paths of JSON files to merge. If the JSON data you want to merge is contained *within* the JSON file, pass an object specifying the `jsonPath` and `configProperty`.  


**Returns**: `Object` - the merged JSON data

####Example
```js
var loadConfig = require("config-master");

var storedConfig = loadConfig(
    "~/.global-defaults.json", 
    "project-specific-defaults.json", 
    { jsonPath: "package.json", configProperty: "config" }
);
```















