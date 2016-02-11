
//= require "dropdown-list"

Ergo.defineClass('Ergo.widgets.DropdownMenu', {

	extends: 'Ergo.widgets.DropdownList',

	defaults: {
		cls: 'menu',
		defaultItem: {
			components: {
				content: {
					etype: 'html:a'
				}
			}
		}
	}

}, 'widgets:dropdown-menu');
