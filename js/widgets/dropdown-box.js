
//= require <extensions/popup>


Dino.declare('Dino.widgets.DropdownBox', 'Dino.widgets.Box', {
	
	defaults: {
		cls: 'dino-dropdown-box',
		extensions: [Dino.Popup],
		style: {'display': 'none'}
//		layout: 'popup'
//		hideOn: 'outerClick'
	}
	
		
}, 'dropdown-box');
