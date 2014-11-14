var test = require("tape"),
    boil = require("../lib/boil");

test("register partial files", function(t){
    boil.registerPartials("test/partials/*");
    t.equals(boil._handlebars.partials.one, "1");
    t.equals(boil._handlebars.partials.two, "2");
    t.end();
});
