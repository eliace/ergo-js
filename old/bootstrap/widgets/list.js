


Ergo.defineClass('Bootstrap.widgets.List', 'Ergo.widgets.List', {
	
	defaults: {
		defaultItem: {
			etype: 'bootstrap:list-item'
		}
	}
	
}, 'bootstrap:list');



Ergo.defineClass('Bootstrap.widgets.ListItem', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<li/>',
		components: {
			content: {
				etype: 'widget:link'
			}
		}
	},

	setText: function(v) { this.content.opt('text', v); },
	
	setHref: function(v) { this.content.opt('href', v); },
	
}, 'bootstrap:list-item');

