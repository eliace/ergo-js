var test = require("tape"),
    w = require("../");

test("without (object)", function(t){
    var object = {
    	one: 1,
		two: 2,
		three: 3,
		four: 4
    };
    t.deepEqual(w.without(object, [ "two", "three" ]), {
    	one: 1,
		four: 4
    });
    t.end();
});
