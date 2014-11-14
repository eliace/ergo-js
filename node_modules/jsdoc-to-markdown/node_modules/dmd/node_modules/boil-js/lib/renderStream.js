"use strict";
var util = require("util"),
    boil = require("../"),
    mfs = require("more-fs"),
    Transform = require("stream").Transform;

module.exports = RenderStream;

/**
@classdesc Renders the incoming doclet data using the specified handlebars assets
@param {object} - The render options
@param {string} [options.template] - A handlebars template to insert your documentation into. 
@return {stream} A readable stream containing the rendered markdown
@alias module:boil-js.renderStream
```
*/
function RenderStream(options){
    if (!(this instanceof RenderStream)) return new RenderStream(options);
    Transform.call(this, options);

    this.json = new Buffer(0);
    this.options = options;
}
util.inherits(RenderStream, Transform);

RenderStream.prototype._transform = function(chunk, enc, done){
    if (chunk) this.json = Buffer.concat([ this.json, chunk ]);
    done();
};

RenderStream.prototype._flush = function(){
    try {
        var data = JSON.parse(this.json);
    } catch(err){
        err.message = "[boil.RenderStream] input json failed to parse: " + err.message + "\n";
        err.message += "input: \n";
        err.message += this.json.toString();
        return this.emit("error", err);
    }
    try {
        var result = renderTemplate(data, this.options);
        this.push(result);
    } catch(err){
        this.emit("error", err);
    }
    this.push(null);
};

function renderTemplate(data, options){
    /* make the options available to the templates */
    data.options = options;

    return boil.render(options.template, data);
}
