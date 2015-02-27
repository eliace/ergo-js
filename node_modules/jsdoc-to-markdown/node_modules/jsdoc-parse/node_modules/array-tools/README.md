[![view on npm](http://img.shields.io/npm/v/array-tools.svg)](https://www.npmjs.org/package/array-tools)
[![npm module downloads per month](http://img.shields.io/npm/dm/array-tools.svg)](https://www.npmjs.org/package/array-tools)
[![Build Status](https://travis-ci.org/75lb/array-tools.svg?branch=master)](https://travis-ci.org/75lb/array-tools)
[![Dependency Status](https://david-dm.org/75lb/array-tools.svg)](https://david-dm.org/75lb/array-tools)

<a name="module_array-tools"></a>
#array-tools
Useful functions for working with arrays

**Example**  
```js
var a = require("array-tools");
```

**Members**

* [a.pluck(arrayOfObjects, ...property)](#module_array-tools.pluck)
* [a.pick(arrayOfObjects, ...property)](#module_array-tools.pick)
* [a.arrayify(input)](#module_array-tools.arrayify)
* [a.exists(array, value)](#module_array-tools.exists)
* [a.where(arrayOfObjects, query)](#module_array-tools.where)
* [a.findWhere(arrayOfObjects, query)](#module_array-tools.findWhere)
* [a.without(input, toRemove)](#module_array-tools.without)
* [a.union(array1, array2, idKey)](#module_array-tools.union)
* [a.commonSequence(a, b)](#module_array-tools.commonSequence)
* [a.unique(array)](#module_array-tools.unique)
* [a.spliceWhile(array, index, test, ...elementN)](#module_array-tools.spliceWhile)
* [a.extract(array, callback)](#module_array-tools.extract)

<a name="module_array-tools.pluck"></a>
##a.pluck(arrayOfObjects, ...property)
Plucks the value of the specified property from each object in the input array

**Params**

- arrayOfObjects `Array.<Object>` - the input array of objects
- ...property `string` - the property(s) to pluck

**Returns**: `Array`  
**Example**  
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

<a name="module_array-tools.pick"></a>
##a.pick(arrayOfObjects, ...property)
return a copy of the input `arrayOfObjects` containing objects having only the cherry-picked properties

**Params**

- arrayOfObjects `Array.<object>` - the input
- ...property `string` - the properties to include in the result

**Returns**: `Array.<object>`  
**Example**  
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

<a name="module_array-tools.arrayify"></a>
##a.arrayify(input)
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts `null` or `undefined` to an empty array

**Params**

- input `*` - the input value to convert to an array

**Returns**: `Array`  
**Example**  
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

<a name="module_array-tools.exists"></a>
##a.exists(array, value)
returns true if a value, or nested object value exists in an array

**Params**

- array `Array` - the array to search
- value `*` - the value to search for

**Returns**: `boolean`  
**Example**  
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

<a name="module_array-tools.where"></a>
##a.where(arrayOfObjects, query)
returns an array containing items from `arrayOfObjects` where key/value pairs 
from `query` are matched identically

**Params**

- arrayOfObjects `Array` - the array to search
- query `query` - an object containing the key/value pairs you want to match

**Returns**: `Array`  
**Example**  
```js
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]
> a.where(dudes, { age: 8})
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 } ]
```

<a name="module_array-tools.findWhere"></a>
##a.findWhere(arrayOfObjects, query)
returns the first item from `arrayOfObjects` where key/value pairs 
from `query` are matched identically

**Params**

- arrayOfObjects `Array` - the array to search
- query `query` - an object containing the key/value pairs you want to match

**Returns**: `Object`  
**Example**  
```js
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]
> a.findWhere(dudes, { age: 8})
{ name: 'Jim', age: 8 }
```

<a name="module_array-tools.without"></a>
##a.without(input, toRemove)
Returns the input minus the specified values.

**Params**

- input `Array` - the input array
- toRemove `*` - a single, or array of values to omit

**Returns**: `Array`  
**Example**  
```js
> a.without([ 1, 2, 3 ], 2)
[ 1, 3 ]
> a.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]
```

<a name="module_array-tools.union"></a>
##a.union(array1, array2, idKey)
merge two arrays into a single array of unique values

**Params**

- array1 `Array` - First array
- array2 `Array` - Second array
- idKey `string` - the unique ID property name

**Returns**: `Array`  
**Example**  
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

<a name="module_array-tools.commonSequence"></a>
##a.commonSequence(a, b)
Returns the initial elements which both input arrays have in common

**Params**

- a `Array` - first array to compare
- b `Array` - second array to compare

**Returns**: `Array`  
**Example**  
```js
> a.commonSequence([1,2,3], [1,2,4])
[ 1, 2 ]
```

<a name="module_array-tools.unique"></a>
##a.unique(array)
reduces an array to unique values

**Params**

- array `Array` - input array

**Returns**: `Array`  
**Example**  
```js
> n = [1,6,6,7,1]
[ 1, 6, 6, 7, 1 ]
> a.unique(n)
[ 1, 6, 7 ]
```

<a name="module_array-tools.spliceWhile"></a>
##a.spliceWhile(array, index, test, ...elementN)
splice from `index` until `test` fails

**Params**

- array `Array` - the input array
- index `number` - the position to begin splicing from
- test `RegExp` - the test to continue splicing while true
- ...elementN `*` - the elements to add to the array

**Returns**: `Array`  
**Example**  
```js
> letters = ["a", "a", "b"]
[ 'a', 'a', 'b' ]
> a.spliceWhile(letters, 0, /a/, "x")
[ 'a', 'a' ]
> letters
[ 'x', 'b' ]
```

<a name="module_array-tools.extract"></a>
##a.extract(array, callback)
Removes items from `array` which pass the `callback` test. Modifies the input array, returns the extracted.

**Params**

- array `Array` - the input array, modified directly
- callback `function` - called on each item in `array`. Those which return a truthy value are extracted.

**Returns**: `Array` - the extracted items.  


*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.