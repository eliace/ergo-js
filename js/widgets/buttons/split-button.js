
//= require "dropdown-button"

Ergo.defineClass('Ergo.widgets.SplitButton', 'Ergo.widgets.DropdownButton', {
	
	defaults: {
		baseCls: 'split-button',
		components: {
			actionButton: {
				etype: 'button',
				weight: -10
			}
		}
	},
	
	setText: function(v) {
		this.actionButton.opt('text', v);
	}
	
	
}, 'widgets:split-button');
