"use strict";

module.exports = function(handlebars){
    handlebars.registerHelper("json-stringify", JSON.stringify);
};
