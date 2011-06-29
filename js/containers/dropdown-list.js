
//= require "list"
//= require <widgets/glass-pane>

/**
 * @class
 * @extends Dino.containers.List
 */
Dino.containers.DropdownList = Dino.declare('Dino.containers.DropdownList', 'Dino.containers.List', /** @lends Dino.containers.DropdownList.prototype */ {
	
	defaults: {
		html: '<div autoheight="ignore"></div>',
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		baseCls: 'dino-dropdown-list',
		offset: [0, 0],
		hideOn: 'outerClick',
		layout: 'popup'
	}
	
	
}, 'dropdown-list');