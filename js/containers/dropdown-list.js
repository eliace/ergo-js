
//= require "list"
//= require <widgets/glass-pane>
//= require <extensions/popup>

/**
 * @class
 * @extends Dino.containers.List
 */
Dino.containers.DropdownList = Dino.declare('Dino.containers.DropdownList', 'Dino.containers.List', /** @lends Dino.containers.DropdownList.prototype */ {
	
	defaults: {
		html: '<div autoheight="ignore"></div>',
		baseCls: 'dino-dropdown-list',
		extensions: [Dino.Popup],
		style: {'display': 'none'},
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		hideOn: 'outerClick'
	}
	
	
}, 'dropdown-list');