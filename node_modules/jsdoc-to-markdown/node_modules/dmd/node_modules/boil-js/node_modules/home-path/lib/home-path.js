"use strict";

/**
Cross-platform home directory retriever, tested on Windows XP, Windows 8.1, Mac OSX, Linux. 
@module
@example
```js
> var getHomePath = require("home-path");
> getHomePath()
'/Users/Lloyd'
```
*/
module.exports = function() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};
