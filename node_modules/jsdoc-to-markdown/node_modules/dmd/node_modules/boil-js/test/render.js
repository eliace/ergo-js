var test = require("tape"),
    boil = require("../lib/boil");

test("render", function(t){
    var data = { one: 1, two: 2 };
    var template = "{{one}}{{two}}";
    var result = boil.render(template, data);

    t.equal(result, "12");
    t.end();
});

test("render with partials", function(t){
    var data = { one: 1, two: 2, three: 3, four: 4 };
    var template = "{{one}}{{two}}{{>three}}{{>four}}";

    boil._handlebars.registerPartial("three", "{{three}}");
    boil._handlebars.registerPartial("four", "{{four}}");
    
    var result = boil.render(template, data);

    t.equal(result, "1234");
    t.end();
});

test("render with helpers", function(t){
    var data = { one: 1, two: 2 };
    var template = "{{one}}{{two}}{{three a}}{{four a}}";

    boil._handlebars.registerHelper("three", function(){ return 3; });
    boil._handlebars.registerHelper("four", function(){ return 4; });
    var result = boil.render(template, data);

    t.equal(result, "1234");
    t.end();
});
