

Ergo.defineClass('Ergo.widgets.Menu', {

	extends: 'Ergo.widgets.List',

	defaults: {
		cls: 'menu',
		defaultItem: {
			etype: 'menu-item'
		}
	}

}, 'widgets:menu');




Ergo.defineClass('Ergo.widgets.MenuItem', {

	extends: 'Ergo.widgets.Box',

	defaults: {
		tag: 'li',
		components: {
			content: {
				etype: 'html:a'
			}
		}
	}

}, 'widgets:menu-item');









Ergo.defineClass('Ergo.widgets.NestedMenu', {

	extends: 'Ergo.widgets.Menu',

	defaults: {
//		html: '<ul/>',
//		cls: 'tree',
		dynamic: true,
		defaultItem: {
			etype: 'nested-menu-item'
		}

	},

	_preConstruct: function(o) {
		this._super(o);

//		o.defaultItem = Ergo.smart_override({components: {sub: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
		o.defaultItem = $ergo.mergeOptions({components: {sub: {nestedItem: o.nestedItem}}}, [o.nestedItem, o.defaultItem]);
	}


}, 'widgets:nested-menu');




Ergo.defineClass('Ergo.widgets.NestedMenuItem', {

	extends: 'Ergo.widgets.MenuItem',

	defaults: {

//		html: '<li/>',
		components: {
			// content: {
			// 	etype: 'html:a'
			// },
			sub: {
				etype: 'nested-menu',
				autoRender: 'non-empty',
				dynamic: true,
				dataId: 'children',
				weight: 100
			}
		}

	}


}, 'widgets:nested-menu-item');
