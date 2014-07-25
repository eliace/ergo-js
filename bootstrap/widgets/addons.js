
//= require "dropdown"


Ergo.defineClass('Bootstrap.widgets.InputAddon', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'input-group-addon',
		defaultComponent: {
			etype: 'html:input'
		}
	}
	
}, 'bootstrap:input-addon');


Ergo.defineClass('Bootstrap.widgets.ButtonAddon', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<span/>',
		cls: 'input-group-btn',
		content: {
			etype: 'bootstrap:button'
		}
	},
	
	setText: function(v) {
		this.content.opt('text', v);
	}
	
}, 'bootstrap:button-addon');



Ergo.defineClass('Bootstrap.widgets.DropdownAddon', 'Bootstrap.widgets.Dropdown', {
	
	defaults: {
		states: {
			'segmented:dir': 'input-group-btn'
		},
		state: 'segmented'
	}
	
}, 'bootstrap:dropdown-addon');

