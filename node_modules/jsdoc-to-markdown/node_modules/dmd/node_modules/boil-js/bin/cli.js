#!/usr/bin/env node
"use strict";

var boil = require("../"),
    mergeConfig = require("config-master"),
    dope = require("console-dope"),
    path = require("path"),
    mfs = require("more-fs"),
    fs = require("fs"),
    cliArgs = require("command-line-args"),
    getHomeDir = require("home-path"),
    o = require("object-tools"),
    a = require("array-tools");

/* Define command-line args  */
var cli = cliArgs([
    { name: "help", alias: "h", type: Boolean },
    { name: "recipes", alias: "r", type: Array, defaultOption: true },
    { name: "config", alias: "c", type: Boolean },
    { name: "list", alias: "l", type: Boolean },
    { name: "helper", alias: "f", type: Array },
    { name: "partial", alias: "p", type: Array },
    { name: "template", alias: "t", type: String },
    { name: "data", alias: "d", type: String },
    { name: "args", alias: "a", type: Array }
]);

var usage = cli.getUsage({
    title: "boil-js",
    header: "Content generator",
    forms: [ "$ boil [options] <recipes>" ]
});

try{
    var argv = cli.parse();
} catch(err){
    halt(err);
}

if (argv.help) {
    console.log(usage);
    process.exit(0);
}

/* returns an object containing boil options */
function getConfig(){
    /* pertinent paths */
    var p = {
        cwd: path.join(process.cwd(), "boil.json"),
        cwdHbs: path.join(process.cwd(), "boil.hbs"),
        pkg: path.join(process.cwd(), "package.json"),
        home: path.join(getHomeDir(), ".boil.json"),
        boilDir: path.join(getHomeDir(), ".boil")
    };
    
    if (!fs.existsSync(p.cwd) && fs.existsSync(p.cwdHbs)){
        var tmpPath = mfs.getTempFilePath("boilHbs.json");
        var result = boil.render(mfs.read(p.cwdHbs));
        // console.log(result)
        fs.writeFileSync(tmpPath, result);
    }
    
    /*
    merge config from these locations, in this order:
    ~/.boil.json
    $(pwd)/boil.json
    $(pwd)/package.json ("boil" property)
    */
    var config = mergeConfig(
        p.home,
        tmpPath || p.cwd,
        { jsonPath: p.pkg, configProperty: "boil" }
    );

    mfs.deleteFile(tmpPath);
    
    /*
    add each file in ~/.boil as a recipe
    */
    var recipeFiles = fs.readdirSync(p.boilDir);
    recipeFiles.forEach(function(file){
        var template = fs.readFileSync(path.join(p.boilDir, file), "utf8");
        config[path.basename(file, ".hbs")] = {
            template: template
        };
    });

    if (Object.keys(config).length === 0){
        console.error("No config");
        process.exit(1);
    }

    return config;
}

if (argv.config){
    console.dir(o.without(getConfig(), "options"));
    process.exit(0);
}
if (argv.list){
    console.log(a.without(Object.keys(getConfig()), "options"));
    process.exit(0);
}

if (argv.helper) boil.registerHelpers(argv.helper);
if (argv.partial) boil.registerPartials(argv.partial);

if (argv.recipes && argv.recipes.length) {
    var config = getConfig();
    argv.recipes.forEach(boil.renderRecipe.bind(null, config, argv.args));

} else if (argv.template) {
    var data = argv.data
        ? JSON.parse(mfs.read(argv.data))
        : {};
    console.log(boil.render(mfs.read(argv.template), data));

} else {
    console.log(usage);
}

function halt(err){
    dope.red.error(err.stack);
    dope.error(usage);
    process.exit(1);
}
