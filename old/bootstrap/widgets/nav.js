

Ergo.defineClass('Bootstrap.widgets.Nav', 'Bootstrap.widgets.List', {
	
	defaults: {
		cls: 'nav',
		states: {
			'tabs:nav': 'nav-tabs',
			'pills:nav': 'nav-pills',
			'stacked': 'nav-stacked',
			'justified': 'nav-justified'
		},
		mixins: ['selectable'],
		defaultItem: {
//			etype: 'bootstrap:nav-item',
			states: {
				'selected': 'active'
			}
		}
	}
	
}, 'bootstrap:nav');




/*
Ergo.defineClass('Bootstrap.widgets.NavItem', 'Ergo.widgets.Box', {
	
	defaults: {
		components: {
			content: {
				etype: 'html:a'
			}
		},
		set: {
			'text': function(v) { this.content.opt('text', v); }
		},
		binding: function(v) { this.opt('text', v); }
	}
	
}, 'bootstrap:nav-item');
*/


Ergo.defineClass('Bootstrap.widgets.DropdownNavItem', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		html: '<li/>',
		states: {
			'dropdown:dir': 'dropdown'
		},
		state: 'dropdown',
		components: {
			button: {
				etype: 'widget:link',
				cls: 'dropdown-toggle'
			}
		}
	}
	
}, 'bootstrap:dropdown-nav-item');

