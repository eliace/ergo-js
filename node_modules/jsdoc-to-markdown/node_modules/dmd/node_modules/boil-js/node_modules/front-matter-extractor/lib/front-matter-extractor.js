var yaml = require("js-yaml"),
    helper = require("./helper");

exports.extract = extract;
exports.helper = helper;

function extract(input){
    var matter = /^---$([\s\S]*)^---\s/m,
        result = {};
    result._remainder = input;
    if (input && typeof input === "string"){
        var matches = input.match(matter);
        if (matches){
            result = yaml.safeLoad(matches[1]);
            result._remainder = input.replace(matches[0], "");
        }
    }
    return result;
};
