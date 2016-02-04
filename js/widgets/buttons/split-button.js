
//= require "dropdown-button"

Ergo.defineClass('Ergo.widgets.SplitButton', 'Ergo.widgets.DropdownButton', {

	defaults: {
		as: 'split group',
		components: {
			actionButton: {
				etype: 'button',
				weight: -10
			},
			content: {
				components: {
					caret: {
						'~as': 'after'
					}
				}
			}
		}
	},

	set text(v) {
		this.$actionButton.opt('text', v);
	}


}, 'widgets:split-button');
