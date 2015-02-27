
//= require "dropdown-list"

Ergo.defineClass('Ergo.widgets.DropdownMenu', 'Ergo.widgets.DropdownList', {
	
	defaults: {
		baseCls: 'dropdown-menu',
		defaultItem: {
			components: {
				content: {
					etype: 'link'
				}				
			}
		}
	}
	
}, 'widgets:dropdown-menu');
