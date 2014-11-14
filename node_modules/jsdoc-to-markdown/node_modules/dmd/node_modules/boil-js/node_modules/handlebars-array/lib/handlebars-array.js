var a = require("array-tools"),
    util = require("util");

module.exports = function(handlebars){
    handlebars.registerHelper("where", function(arrayOfObjects, options){
        Object.keys(options.hash).forEach(function(key){
            if (/^-/.test(key)){
                var newKey = key.replace(/^-/, "!");
                options.hash[newKey] = options.hash[key];
                delete options.hash[key];
            }
        });
        return Array.isArray(arrayOfObjects) && a.where(arrayOfObjects, options.hash);
    });

    handlebars.registerHelper("findWhere", function(arrayOfObjects, options){
        return Array.isArray(arrayOfObjects) && a.where(arrayOfObjects, options.hash)[0];
    });

    handlebars.registerHelper("join", function(array, delimiter){
        return Array.isArray(array) && array.join(delimiter);
    });

    handlebars.registerHelper("pluck", function(arrayOfObjects, property){
        return Array.isArray(arrayOfObjects) && a.pluck(arrayOfObjects, property);
    });

    handlebars.registerHelper("map", function(array, iteratorBody){
        var iterator = new Function("value", "index", "array", iteratorBody);
        return Array.isArray(array) && array.map(iterator);
    });

    handlebars.registerHelper("sort", function(array, negativeTest, positiveTest){
        var f = "if (%s) { return -1; } else if (%s) { return 1; } else { return 0; }"
		if (Array.isArray(array) && array.length){
	        if (negativeTest && positiveTest){
	            return array.sort(new Function("a", "b", util.format(f, negativeTest, positiveTest)));
	        } else {
	            return array.sort();
	        }
		} else {
			return array;
		}
    });

    handlebars.registerHelper("filter", function(array, iteratorBody){
        var iterator = new Function("value", "index", "array", iteratorBody);
        return Array.isArray(array) && array.map(iterator);
    });
    
    handlebars.registerHelper("slice", function(array, begin, end){
        if (typeof end === "object") end = undefined;
        if (typeof begin === "object") begin = undefined;
        return array.slice(begin, end);
    });

    handlebars.registerHelper("sizeBetween", function(array, min){
        return Array.isArray(array) && array.length >= min;
    });    
};
