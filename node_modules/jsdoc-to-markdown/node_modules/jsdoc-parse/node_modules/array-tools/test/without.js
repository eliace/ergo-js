var test = require("tape"),
    w = require("../");

test("without (array)", function(t){
    var array = [ 1,2,3,4 ];
    t.deepEqual(w.without(array, [ 2, 3 ]), [ 1, 4 ]);
    t.end();
});
