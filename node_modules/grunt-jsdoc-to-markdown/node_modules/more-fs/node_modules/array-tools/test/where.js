var test = require("tape"),
    w = require("../");

test("where", function(t){
    var arr = [
        { result: false, number: 1 },
        { result: false, number: 2 }
    ];
    t.deepEqual(w.where(arr, { result: true }), []);
    t.deepEqual(w.where(arr, { result: false }), [
        { result: false, number: 1 },
        { result: false, number: 2 }
    ]);
    t.deepEqual(w.where(arr, { result: false, number: 3 }), []);
    t.deepEqual(w.where(arr, { result: false, number: 2 }), [
        { result: false, number: 2 }
    ]);
    t.end();
});
