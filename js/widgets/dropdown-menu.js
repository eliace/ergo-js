
//= require "dropdown-list"

Ergo.defineClass('Ergo.widgets.DropdownMenu', 'Ergo.widgets.DropdownList', {
	
	defaults: {
		baseCls: 'menu',
		defaultItem: {
			components: {
				content: {
					etype: 'html:a'
				}				
			}
		}
	}
	
}, 'widgets:dropdown-menu');
