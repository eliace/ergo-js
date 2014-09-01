
//= require "dropdown-list"

Ergo.defineClass('Ergo.widgets.DropdownMenu', 'Ergo.widgets.DropdownList', {
	
	defaults: {
		baseCls: 'dropdown-menu',
		defaultItem: {
			components: {
				content: {
					etype: 'link'
				}				
			},
			set: {
				'text': function(v) { this.content.opt('text', v); }
			}
		}
	}
	
}, 'widgets:dropdown-menu');
