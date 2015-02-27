var path = require("path");

module.exports = function(handlebars){
    handlebars.registerHelper("path-normalize", path.normalize);
    handlebars.registerHelper("path-join", path.join);
    handlebars.registerHelper("path-resolve", path.resolve);
    handlebars.registerHelper("path-relative", path.relative);
    handlebars.registerHelper("path-basename", path.basename);
    handlebars.registerHelper("path-extname", path.extname);
};
