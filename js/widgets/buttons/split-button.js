
//= require "dropdown-button"

Ergo.defineClass('Ergo.widgets.SplitButton', 'Ergo.widgets.DropdownButton', {
	
	defaults: {
		baseCls: 'split-button',
		components: {
			actionButton: {
				etype: 'button',
				weight: -10
			},
			content: {
				components: {
					caret: {
						'-cls': 'after'
					}
				}
			}
		}
	},
	
	set_text: function(v) {
		this.actionButton.opt('text', v);
	}
	
	
}, 'widgets:split-button');
