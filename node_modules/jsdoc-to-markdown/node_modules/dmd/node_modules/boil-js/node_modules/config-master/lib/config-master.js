var a = require("array-tools"),
    o = require("object-tools"),
    path = require("path");

/**
Merges together JSON data from the specified files, in the specified order. Designed for app config management.
@module
@param {...string} jsonPath - the paths of JSON files to merge. If the JSON data you want to merge is contained *within* the JSON file, pass an object specifying the `jsonPath` and `configProperty`.
@returns {Object} the merged JSON data
@example
```js
var loadConfig = require("config-master");

var storedConfig = loadConfig(
    "~/.global-defaults.json", 
    "project-specific-defaults.json", 
    { jsonPath: "package.json", configProperty: "config" }
);
```
*/
module.exports = loadConfig;

function loadConfig(){
    var configs = a.arrayify(arguments).map(function(file){
        var jsonPath, configProperty;
        try {
            if (typeof file === "object"){
                jsonPath = file.jsonPath;
                configProperty = file.configProperty;
            } else {
                jsonPath = file;
            }

            /*
            if this require fails it will throw, return null and move on..
            i.e. ignore bad paths.
            */
            var data = require(jsonPath);
            if (configProperty){
                return data[configProperty];
            } else {
                return data;
            }
        } catch(e){
            return null;
        }
    });
    return o.extend.apply(null, configs);
}
