
[![Code Climate](https://codeclimate.com/github/eliace/ergo-js/badges/gpa.svg)](https://codeclimate.com/github/eliace/ergo-js)


## Build

Install dependencies
```bash
npm install
```

Build project
```bash
gulp
```


## Bower

Install as bower component

```bash
bower install ergo-js
```


## Quick start


Подключаем сценарии ядра и виджетов
```html
<script src="lib/ergojs-core.js" type="text/javascript"></script>
<script src="lib/ergojs-widgets-all.js" type="text/javascript"></script>
```

Подключаем стили
```html
<link href='lib/ergojs.css' rel='stylesheet' type='text/css'>
```

Самый лучший момент для создания виджетов - после загрузки страницы, поэтому воспользуемся обработчиком события jQuery.ready

```javascript
$(document).ready(function(){

    // создаем простой виджет и добавляем его в <body/>
    var w = $.ergo({
        etype: 'box'
    });

    w.render('body');

});

```



## Release History

#### Release 12.1
* Migrated to jQuery 2 (no more IE8 support)
* `mixins` and `plugins` replaced by `include`
* `events.reg()` and `events.unreg()` renamed to `events.on()` and `events.off()`
* `events.off()` without arguments removes all event listeners
* Option `selector` of `selectable` mixin renamed to `lookup`
* Using ES5 getters and setters (get_*/set_* accessors are deprecated)
* Less support
* New layout option `autoClass` adds component name as element class
* Added `flex` as standalone layout
* Component shortcuts should be prefixed with `$` (access to component like `widget.myComponent` is deprecated)
* New `autoRender` option value `non-empty` renders only non-empty containers
* Installing ergo-js as bower dependency
* `format` shortcut syntax extended to use predefinded formatters: `'#{property|format}'` or `'#{*|format}'`
* Filtering and sorting became part of widget (`renderFilter`/`renderSorter` and `dynamicFilter`/`dynamicSorter`)
* New event shortcut syntax (`onClick: 'action:selectItem'` calls method `action` with arg `selectItem`)
* New `action` method rises specified event
* Multikey datasource support: `dataId: ['a', 'b', 'c']`
* New autoHeight mode `fit` adjusts widget height to container if it lesser than container height
* New static option `as` combines `cls` and `state` behaviour





## Road Map
* Focus management
* CSS animations
* Flex layout
* Mobile support
* Themes
* Performance optimization

and more new widgets :)