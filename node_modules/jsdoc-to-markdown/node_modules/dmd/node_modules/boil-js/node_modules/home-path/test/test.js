var test = require("tape");
var getHomePath = require("../lib/home-path");

test("returns string", function(t){
    t.equal(typeof getHomePath(), "string");
    t.end();
});
