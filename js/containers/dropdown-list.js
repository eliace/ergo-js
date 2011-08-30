
//= require "list"
//= require <widgets/glass-pane>
//= require <extensions/popup>

/**
 * @class
 * @extends Ergo.containers.List
 */
Ergo.containers.DropdownList = Ergo.declare('Ergo.containers.DropdownList', 'Ergo.containers.List', /** @lends Ergo.containers.DropdownList.prototype */ {
	
	defaults: {
		html: '<div autoheight="ignore"></div>',
		baseCls: 'ergo-dropdown-list',
		extensions: [Ergo.Popup],
		style: {'display': 'none'},
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		hideOn: 'outerClick'
	}
	
	
}, 'dropdown-list');