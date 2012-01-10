
//= require <widgets/glass-pane>
//= require <extensions/popup>

/**
 * @class
 * @name Ergo.widgets.DropdownBox
 * @extends Ergo.widgets.Box
 */
Ergo.declare('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', /** @lends Ergo.widgets.DropdownBox.prototype */ {
	
	defaults: {
		html: '<div autoheight="ignore"></div>',
		baseCls: 'e-dropdown-box',
		extensions: ['popup'],
		style: {'display': 'none'},
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		hideOn: 'outerClick'
	}
	
	
}, 'dropdown-box');