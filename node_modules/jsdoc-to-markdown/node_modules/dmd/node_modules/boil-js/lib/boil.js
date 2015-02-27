"use strict";
var handlebars = require("handlebars"),
    o = require("object-tools"),
    a = require("array-tools"),
    mfs = require("more-fs"),
    FileSet = require("file-set"),
    path = require("path"),
    fme = require("front-matter-extractor"),
    renderStream = require("./renderStream");

require("handlebars-array")(handlebars);
require("handlebars-fs")(handlebars);
require("handlebars-fileset")(handlebars);
require("handlebars-string")(handlebars);
require("handlebars-path")(handlebars);
require("handlebars-json")(handlebars);
require("handlebars-comparison")(handlebars);
require("handlebars-ansi")(handlebars);
require("handlebars-regexp")(handlebars);
require("front-matter-extractor").helper(handlebars);

exports._handlebars = handlebars;
exports.registerPartials = registerPartials;
exports.registerHelpers = registerHelpers;
exports.render = render;
exports.compile = compile;
exports.renderStream = renderStream;
exports.renderRecipe = renderRecipe;

handlebars.logger.level = 1;

function render(template, data){
    return compile(template)(data);
}

function compile(template){
    return handlebars.compile(template);
    if (!template) throw new Error("[boil.compile] template is empty: " + JSON.stringify(template));
}

function registerPartials(paths){
    var fileSet = new FileSet(paths);
    fileSet.files.forEach(function(file){
        handlebars.registerPartial(
            path.basename(file, ".hbs"),
            mfs.read(file)
        );
    });
}

function registerHelpers(helpers){
    var fileSet = new FileSet(helpers);
    fileSet.files.forEach(function(file){
        require(path.resolve(process.cwd(), file))(handlebars);
    });
}

function renderRecipe(config, args, recipeName){
    config = setArgs(config, args);
    var recipe = config[recipeName];
    if (!recipe) {
        console.error("Recipe not in config: " + recipeName);
        return;
    }
    if (Array.isArray(recipe)){
        var recipes = recipe;
        recipes.forEach(renderRecipe.bind(null, config, args));
    } else {
        var mergedOptions = o.extend(config.options, recipe.options);
        registerPartials(mergedOptions.partials);
        registerHelpers(mergedOptions.helpers);

        var data = o.extend(config.options && config.options.data, recipe.data);
        var result = render(recipe.template, data);
        
        if (recipe.dest){
            recipe.dest = render(recipe.dest, data);
            mfs.write(recipe.dest, result);
            console.log("%s bytes written to %s", result.length, recipe.dest);
        } else {
            process.stdout.write(result);
        }
    }
}

function setArgs(config, args){
	if (!config.options) config.options = {};
	if (!config.options.data) config.options.data = {};
	config.options.data.args = args;
    return config;
}

