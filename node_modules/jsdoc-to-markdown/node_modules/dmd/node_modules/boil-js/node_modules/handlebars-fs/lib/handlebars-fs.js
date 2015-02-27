var fs = require("fs");
var mfs = require("more-fs");

module.exports = function(handlebars){
    handlebars.registerHelper("fs-appendFile", fs.appendFileSync);
    handlebars.registerHelper("fs-chmod", fs.chmodSync);
    handlebars.registerHelper("fs-chown", fs.chownSync);
    handlebars.registerHelper("fs-exists", fs.existsSync);
    handlebars.registerHelper("fs-link", fs.linkSync);
    handlebars.registerHelper("fs-mkdir", fs.mkdirSync);
    handlebars.registerHelper("fs-readdir", fs.readdirSync);
    handlebars.registerHelper("fs-readFile", function(filename){
        if (Array.isArray(filename)){
            var filenames = filename;
            return filenames.map(function(file){
                var stat = fs.statSync(file);
                return {
                    filename: file,
                    content: mfs.read(file),
                    modified: stat.mtime
                };
            });
        } else {
            return mfs.read(filename);
        }
    });
    handlebars.registerHelper("fs-readlink", fs.readlinkSync);
    handlebars.registerHelper("fs-rename", fs.renameSync);
    handlebars.registerHelper("fs-stat", fs.statSync);
    handlebars.registerHelper("fs-symlink", fs.symlinkSync);
    handlebars.registerHelper("fs-truncate", fs.truncateSync);
    handlebars.registerHelper("fs-unlink", fs.unlinkSync);
    handlebars.registerHelper("fs-utimes", fs.utimesSync);
    handlebars.registerHelper("fs-writeFile", fs.writeFileSync);
};
