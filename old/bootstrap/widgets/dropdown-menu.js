

Ergo.defineClass('Bootstrap.widgets.DropdownMenu', 'Ergo.widgets.List', {
	
	etype: 'bootstrap:dropdown-menu',
	
	defaults: {
		cls: 'dropdown-menu',
		defaultItem: {
			etype: 'bootstrap:list-item',
//			content: {
//				etype: 'anchor',
//				tabIndex: -1,
				// onClick: function(e) {
					// e.baseEvent.preventDefault();
				// }
//			},
//			binding: function(v) { this.content.opt('text', v); },
			states: {
				'header': 'dropdown-header'
			}
		},
		shortcuts: {
			'|': {
				cls: 'divider',
				'!content': undefined
			}
		},
		
		itemFactory: function(o, type) {
			if($.isString(o)) {
				if(o.match('^#.+')) o = {text: o.substr(1), cls: 'dropdown-header'};
			}
			return this.children.factory.call(this, o, type);	
		}
		
		
	}
	
});
	

