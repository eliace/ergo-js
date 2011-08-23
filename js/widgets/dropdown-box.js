
//= require <extensions/popup>


Ergo.declare('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'dino-dropdown-box',
		extensions: [Ergo.Popup],
		style: {'display': 'none'}
//		layout: 'popup'
//		hideOn: 'outerClick'
	}
	
		
}, 'dropdown-box');
