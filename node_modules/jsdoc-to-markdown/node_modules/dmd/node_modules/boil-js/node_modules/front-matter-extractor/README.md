[![view on npm](http://img.shields.io/npm/v/front-matter-extractor.svg)](https://www.npmjs.org/package/front-matter-extractor)
![npm module downloads per month](http://img.shields.io/npm/dm/front-matter-extractor.svg)
[![Dependency Status](https://david-dm.org/75lb/front-matter-extractor.svg)](https://david-dm.org/75lb/front-matter-extractor)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-18/front-matter-extractor/README.md?pixel)

front-matter-extractor
======================
install: 
```sh
$ npm install -g front-matter-extractor
```

this code:

```js
var fme = require("front-matter-extractor");
var extracted = fme.extract(input);
```
where `input` is a string containing:

    ---
    title: something
    date: 2013-10-20
    words:
        - this
        - that
    ---
    blah blah blah

sets `extracted` to the following object:

```js
{
    title: "something",
    date: Mon Oct 20 2013 00:00:00 GMT+0000 (GMT),
    words: [ 'this', 'that' ],
    _remainder: "blah blah blah"
}
```
