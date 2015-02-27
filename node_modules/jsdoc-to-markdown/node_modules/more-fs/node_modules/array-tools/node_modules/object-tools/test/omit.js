var test = require("tape"),
    w = require("../");

test(".omit(obj, string[])", function(t){
    var input = { one: 1, two: 2, three: 3, four: 4 };
    var clone = w.omit(input, [ "two", "four" ]);
    t.deepEqual(clone, { one: 1, three: 3 });
    t.end();
});
