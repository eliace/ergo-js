
//= require <widgets/select-box>


Ergo.declare('Ergo.widgets.DateEditor', 'Ergo.widgets.SelectBox', {
	
	defaults: {
		
		cls: 'editor',
		
		buttons: [{
			etype: 'icon-button',
			icon: 'icon-calendar'
		}]
		
	}
	
}, 'date-editor');

