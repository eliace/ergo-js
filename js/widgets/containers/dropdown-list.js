
//= require <widgets/glass-pane>
//= require <extensions/popup>

/**
 * @class
 * @extends Ergo.containers.List
 */
Ergo.widgets.DropdownList = Ergo.declare('Ergo.widgets.DropdownList', 'Ergo.widgets.Box', /** @lends Ergo.containers.DropdownList.prototype */ {
	
	defaults: {
		html: '<div autoheight="ignore"></div>',
		baseCls: 'ergo-dropdown-list',
		extensions: ['popup'],
		style: {'display': 'none'},
		effects: {
			'show': 'none',
			'hide': 'none',
			'delay': 200
		},
		hideOn: 'outerClick'
	}
	
	
}, 'dropdown-list');