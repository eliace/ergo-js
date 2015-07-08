

Ergo.defineClass('Ergo.widgets.Menu', 'Ergo.widgets.List', {

	defaults: {
		baseCls: 'menu',
		defaultItem: {
			etype: 'menu-item'
		}
	}

}, 'widgets:menu');




Ergo.defineClass('Ergo.widgets.MenuItem', 'Ergo.widgets.Box', {

	defaults: {
		html: '<li/>',
		components: {
			content: {
				etype: 'html:a'
			}
		}
	}

}, 'widgets:menu-item');









Ergo.defineClass('Ergo.widgets.NestedMenu', 'Ergo.widgets.Menu', {
	
	defaults: {
//		html: '<ul/>',
//		cls: 'tree',
		dynamic: true,
		defaultItem: {
			etype: 'nested-menu-item'
		}
		
	},
	
	_pre_construct: function(o) {
		this._super(o);
		
		o.defaultItem = Ergo.smart_override({components: {sub: {nestedItem: o.nestedItem}}}, o.nestedItem, o.defaultItem); //FIXME эмуляция обратной перегрузки
	}
	
	
}, 'widgets:nested-menu');	




Ergo.defineClass('Ergo.widgets.NestedMenuItem', 'Ergo.widgets.MenuItem', {
	
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
