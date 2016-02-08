
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

	props: {
		set: {
			text: function(v) {
				this.$actionButton.opt('text', v);
			}
		},
		get: {
			text: function(v) {
				return this.$actionButton.opt('text');
			}
		}
	}



}, 'widgets:split-button');
