"use strict";
var a = require("array-tools");

/**
Javascript comparison operator helpers for handlebars.
@module
*/
module.exports = function(handlebars){
    handlebars.registerHelper("equal", function(arg1, arg2){
        return arg1 === arg2;
    });

    handlebars.registerHelper("equal-some", function(){
        var args = a.arrayify(arguments);
        var input = args.shift();
        args.pop();
        return args.some(function(item){
            return item === input;
        });
    });

    handlebars.registerHelper("equal-every", function(){
        var args = a.arrayify(arguments);
        var input = args.shift();
        args.pop();
        return args.every(function(item){
            return item === input;
        });
    });
    
    handlebars.registerHelper("gt", function(arg1, arg2){
        return arg1 > arg2;
    });

    handlebars.registerHelper("lt", function(arg1, arg2){
        return arg1 < arg2;
    });
    
};
