var path = require("path"),
    FileSet = require("file-set"),
    a = require("array-tools");

module.exports = function(handlebars){
	/**
	@example
	{{fileset "*.txt" "*.js" "files"}}
	*/
    handlebars.registerHelper("fileset", function(){
        var args = a.arrayify(arguments).slice(0, -1);
        var prop = args.pop();
        if (Array.isArray(args[0])){
            return FileSet(args[0])[prop];
        } else {
            return FileSet(args)[prop];
        }
    });
};
