
//= require <mixins/effects>
//= require <mixins/popup>
//= require <widgets/controls/list-box>


Ergo.declare('Ergo.widgets.Dropdown', 'Ergo.widgets.ListBox', {
	
	defaults: {
		cls: 'e-dropbox',
		mixins: ['effects', 'popup'],
		
		position: {
			global: true,
			at: 'left bottom'
		},
		effects: {
			show: 'slideDown',
			hide: 'slideUp',
			delay: 300
		},		

		style: {'display': 'none'}
		
	}
	
	
	
}, 'dropdown');
