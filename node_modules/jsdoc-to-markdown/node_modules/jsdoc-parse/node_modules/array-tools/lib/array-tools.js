"use strict";
var t = require("typical"),
    o = require("object-tools");

/**
Useful functions for working with arrays
@module
@alias a
@example
```js
var a = require("array-tools");
```
*/
exports.pluck = pluck;
exports.pick = pick;
exports.commonSequence = commonSequence;
exports.arrayify = arrayify;
exports.exists = exists;
exports.without = without;
exports.union = union;
exports.where = where;
exports.findWhere = findWhere;
exports.unique = unique;
exports.spliceWhile = spliceWhile;
exports.extract = extract;

/** 
Plucks the value of the specified property from each object in the input array
@param arrayOfObjects {Object[]} - the input array of objects
@param property {...string} - the property(s) to pluck
@returns {Array} 
@example
```js
> var data = [
...     {one: 1, two: 2},
...     {two: "two"},
...     {one: "one", two: "zwei"},
... ];
undefined
> a.pluck(data, "one");
[ 1, 'one' ]
> a.pluck(data, "two");
[ 2, 'two', 'zwei' ]
> a.pluck(data, "one", "two");
[ 1, 'two', 'one' ]
```
@alias module:array-tools.pluck
*/
function pluck(arrayOfObjects, property, property2, property3){
    if (!Array.isArray(arrayOfObjects)) throw new Error(".pluck() input must be an array");
    
    return arrayOfObjects
        .filter(function(obj){
            var one = eval("obj." + property);
            var two = eval("obj." + property2);
            var three = eval("obj." + property3);
            return one || two || three;
        })
        .map(function(obj){
            var one = eval("obj." + property);
            var two = eval("obj." + property2);
            var three = eval("obj." + property3);
            return one || two || three;
        });
}

/**
return a copy of the input `arrayOfObjects` containing objects having only the cherry-picked properties
@param arrayOfObjects {object[]} - the input
@param property {...string} - the properties to include in the result
@return {object[]}
@example
```js
> data = [
    { one: "un", two: "deux", three: "trois" },
    { two: "two", one: "one" },
    { four: "quattro" },
    { two: "zwei" }
]
> a.pick(data, "two")
[ { two: 'deux' },
  { two: 'two' },
  { two: 'zwei' } ]
```
@alias module:array-tools.pick
*/
function pick(){
    var args = arrayify(arguments);
    var arrayOfObjects = args.shift();
    var properties = args;
    
    if (!Array.isArray(arrayOfObjects)) throw new Error(".pick() input must be an array");
    
    return arrayOfObjects
        .filter(function(obj){
            return properties.some(function(prop){
                return obj[prop] !== undefined;
            });
        })
        .map(function(obj){
            var output = {};
            properties.forEach(function(prop){
                if (obj[prop] !== undefined){
                    output[prop] = obj[prop];
                }
            });
            return output;
        });
}

/**
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts `null` or `undefined` to an empty array

@param input {*} - the input value to convert to an array
@returns {Array}
@example
```js
> a.arrayify(null)
[]
> a.arrayify(0)
[ 0 ]
> a.arrayify([ 1, 2 ])
[ 1, 2 ]
> function f(){ return a.arrayify(arguments); }
undefined
> f(1,2,3)
[ 1, 2, 3 ]
```
@alias module:array-tools.arrayify
*/
function arrayify(input){
    if (input === null || input === undefined){
        return [];
    } else if (t.isPlainObject(input) && input.length >= 0 && input.length === Math.floor(input.length)){
        return Array.prototype.slice.call(input);
    } else {
        return Array.isArray(input) ? input : [ input ];
    }
}

/**
returns true if a value, or nested object value exists in an array
@param {Array} - the array to search
@param {*} - the value to search for 
@returns {boolean}
@example
```js
> a.exists([ 1, 2, 3 ], 2)
true
> a.exists([ { result: false }, { result: false } ], { result: true })
false
> a.exists([ { result: true }, { result: false } ], { result: true })
true
> a.exists([ { result: true }, { result: true } ], { result: true })
true
```
@alias module:array-tools.exists
*/
function exists(array, value){
    if (t.isPlainObject(value)){
        var query = value,
            found = false,
            index = 0,
            item;

        while(!found && (item = array[index++])){
            found = o.exists(item, query);
        }
        return found;
    } else {
        return array.indexOf(value) > -1;
    }
}

/**
returns an array containing items from `arrayOfObjects` where key/value pairs 
from `query` are matched identically
@param {Array} - the array to search
@param {query} - an object containing the key/value pairs you want to match
@returns {Array}
@example
```js
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]
> a.where(dudes, { age: 8})
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 } ]
```
@alias module:array-tools.where
*/
function where(arrayOfObjects, query){
    return arrayify(arrayOfObjects).filter(function(item){
        return o.exists(item, query);
    });
}

/**
returns the first item from `arrayOfObjects` where key/value pairs 
from `query` are matched identically
@param {Array} - the array to search
@param {query} - an object containing the key/value pairs you want to match
@returns {Object}
@example
```js
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]
> a.findWhere(dudes, { age: 8})
{ name: 'Jim', age: 8 }
```
@alias module:array-tools.findWhere
*/
function findWhere(arrayOfObjects, query){
    var result = where(arrayOfObjects, query);
    return result.length ? result[0] : null;
}


/**
Returns the input minus the specified values.
@param {Array} - the input array
@param {*} - a single, or array of values to omit
@returns {Array}
@example
```js
> a.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> a.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```
@alias module:array-tools.without
*/
function without(input, toRemove){
    toRemove = arrayify(toRemove);
    return input.filter(function(item){
        return !exists(toRemove, item);
    });
}

/**
merge two arrays into a single array of unique values
@param {Array} - First array
@param {Array} - Second array
@param {string} - the unique ID property name
@returns {Array}
@example
```js
> var array1 = [ 1, 2 ], array2 = [ 2, 3 ];
undefined
> a.union(array1, array2)
[ 1, 2, 3 ]
> var array1 = [ { id: 1 }, { id: 2 } ], array2 = [ { id: 2 }, { id: 3 } ];
undefined
> a.union(array1, array2)
[ { id: 1 }, { id: 2 }, { id: 3 } ]
> var array2 = [ { id: 2, blah: true }, { id: 3 } ]
undefined
> a.union(array1, array2)
[ { id: 1 },
  { id: 2 },
  { id: 2, blah: true },
  { id: 3 } ]
> a.union(array1, array2, "id")
[ { id: 1 }, { id: 2 }, { id: 3 } ]
```
@alias module:array-tools.union
*/
function union(array1, array2, idKey){
    var result = o.clone(array1);
    array2.forEach(function(item){
        if (idKey){
            var query = {};
            query[idKey] = item[idKey];
            if (!findWhere(result, query)){
                result.push(item);
            }
        } else if (!exists(result, item)){
            result.push(item);
        };
    });
    return result;
}

/**
Returns the initial elements which both input arrays have in common
@param {Array} - first array to compare
@param {Array} - second array to compare
@returns {Array}
@example
```js
> a.commonSequence([1,2,3], [1,2,4])
[ 1, 2 ]
```
@alias module:array-tools.commonSequence
*/
function commonSequence(a, b){
    var result = [];
    for (var i = 0; i < Math.min(a.length, b.length); i++){
        if (a[i] === b[i]){
            result.push(a[i]);
        }
    }
    return result;
}

/**
reduces an array to unique values
@param {Array} - input array
@returns {Array}
@example
```js
> n = [1,6,6,7,1]
[ 1, 6, 6, 7, 1 ]
> a.unique(n)
[ 1, 6, 7 ]
```
@alias module:array-tools.unique
*/
function unique(array){
    return array.reduce(function(prev, curr){
        if (prev.indexOf(curr) === -1) prev.push(curr);
        return prev;
    }, []);
}

/**
splice from `index` until `test` fails
@param {Array} - the input array
@param {number} - the position to begin splicing from 
@param {RegExp} - the test to continue splicing while true
@param ...elementN {*} - the elements to add to the array
@returns {Array}
@example
```js
> letters = ["a", "a", "b"]
[ 'a', 'a', 'b' ]
> a.spliceWhile(letters, 0, /a/, "x")
[ 'a', 'a' ]
> letters
[ 'x', 'b' ]
```
@alias module:array-tools.spliceWhile
*/
function spliceWhile(array, index, test){
    for (var i = 0; i < array.length; i++){
        if (!test.test(array[i])) break;
    }
    var spliceArgs = [ index, i ];
    spliceArgs = spliceArgs.concat(arrayify(arguments).slice(3));
    return array.splice.apply(array, spliceArgs);
}

/**
Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted.
@param {Array} - the input array, modified directly
@param {function | object} - Per item in the array, if either the function returns truthy or the exists query is satisfied, the item is extracted
@returns {Array} the extracted items.
@alias module:array-tools.extract
*/
function extract(array, query){
    var result = [];
    var toSplice = [];
    array.forEach(function(item, index){
        if (t.isPlainObject(query)){
            if(o.exists(item, query)){
                result.push(item);
                toSplice.push(index);
            }
        } else {
            if (query(item)){
                result.push(item);
                toSplice.push(index);
            }
        }
    });
    for (var i = 0; i < toSplice.length; i++){
        array.splice(toSplice[i] - i, 1);
    }
    return result;
}
