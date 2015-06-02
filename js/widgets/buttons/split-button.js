
//= require "dropdown-button"

Ergo.defineClass('Ergo.widgets.SplitButton', 'Ergo.widgets.DropdownButton', {
	
	defaults: {
		cls: 'split group',
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
	
	set text(v) {
		this.actionButton.opt('text', v);
	}
	
	
}, 'widgets:split-button');
