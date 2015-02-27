var fme = require("./front-matter-extractor");

module.exports = function(handlebars){
    handlebars.registerHelper("fme-property", function(content, property){
        var result = fme.extract(content)[property];
        return result;
    });

    handlebars.registerHelper("fme-extract", function(content){
        if (Array.isArray(content)){
            var files = content;
            return files.map(function(file){
                return {
                    filename: file.filename,
                    fm: fme.extract(file.content)
                };
            });
        } else {
            var result = fme.extract(content);
            return result;
        }
    });
};
