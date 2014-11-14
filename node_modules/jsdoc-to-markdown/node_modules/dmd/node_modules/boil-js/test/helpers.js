var test = require("tape"),
    boil = require("../lib/boil");

test("register helper files", function(t){
    boil.registerHelpers("test/helpers/*");
    t.ok(boil._handlebars.helpers.one);
    t.ok(boil._handlebars.helpers.two);
    t.end();
});
