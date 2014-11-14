"use strict";

var ansi = require("ansi-escape-sequences");

module.exports = function(handlebars){
    handlebars.registerHelper("ansi-underline", function(input){
        return ansi.underline + input + ansi.reset;
    });
};
