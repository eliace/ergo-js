var test = require("tape"),
    w = require("../");

test("defined", function(t){
    var obj = { 
        one: 1,
        two: undefined,
        three: undefined,
        four: 4
    };
    t.deepEqual(w.defined(obj), { 
        one: 1,
        four: 4
    });
    t.end();
});
