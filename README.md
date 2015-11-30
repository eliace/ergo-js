
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


Add scripts
```html
<script src="lib/ergojs-core.js" type="text/javascript"></script>
<script src="lib/ergojs-widgets-all.js" type="text/javascript"></script>
```

Add styles
```html
<link href='lib/ergojs.css' rel='stylesheet' type='text/css'>
```

Now ergo is ready to use

```javascript
$(document).ready(function(){

    // creates simple widget and renders it into <body/>
    var w = $.ergo({
        etype: 'box'
    });

    w.render('body');

});

```



## Release History

#### Release 0.12.3
* Call context changed to widget for `dynamicFilter`, `dynamicSorter`, `renderFilter` and `renderSorter`
* Disabling aware of `widget._wrapper` with `widget.show(false)` or `widget.hide(false)`
* Disabling aware of html event propagation with `event.stop(false)`
* Disabling aware of html event immediate propagation with `event.interupt(false)`
* New `Ergo.data.Object` and `Ergo.data.Collection` method `drop()` which is exposed to provider method `delete()`
* `_oid()` method replaced by `oid` property so it marked as deprecated


#### Release 0.12.2
* History arranged as include
* Router also arranged as include
* Include `provider-methods` adds provider methods prefixed with `$` to data source
* Default formatter supports format pipeline: `format: '#{prop|format_1|format_2}'`
* Binding events to `observable` properties through `events` option (`data:dirty` fires on `dirty` event of `data`)
* Alias `ergo` for `Ergo`
* Lazy initializing `children`, `items`, `components` and `layout`
* Single child widget has no layout and renders with raw append
* New `Ergo.core.Event` methods: `interrupt`, `yield`
* `widgets:select` supports dropdown navigation by default
* `widgets:select` focusable by default
* New `focusable` include adds `tabindex=0`
* Cancel closing modal dialog with `event.cancel()`
* DataSource events `entry:added`, `entry:deleted` and `entry:changed` are deprecated
* New datasource events: `changed`, `dirty`, `diff`
* New datasource method `sync(newValue)` produces diff from new and old values
* New datasouce functional options `valueUid: (value, index)` and `valueEql: (value1, value2)`
* Injecting `scope` instead of `context` (but `ctx:` prefix still available)
* Binding scope events to widget with `scope:` prefix
* String value of `data` option binds widget properties as data (nested properties not supported)
* `width` and `height` options now uses `outerWidth/outerHeight` methods
* Datasource validator rises `valid` or `invalid` events
* New datasource method `rm` removes entry by value
* `selectable` include uses hash object as multiselect container and no container for single select
* New include `user-input` adds event `input` on keyup if not a special key (esc, tab, left arrow etc) pressed

#### Release 0.12.1
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
* Focus management and keyboard support
* CSS animations
* Flex layout
* Mobile support
* Themes
* Performance optimization
* Test coverage
* Simplify Ergo collections
* Change nested property accessor from `_` to `__` (like BEM)
* Composite weight
* Local storage provider
* Add properties (with `props` option)
* Add overriding methods (with `overrides` option)
* `get` and `set` options should generate getters and setters
* Extend widget/state to replace context/scope
* Rendering to widgets of another scope by name


and more new widgets :)
