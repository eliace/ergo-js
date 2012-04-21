
//= require <extensions/effects>
//= require <extensions/popup>


Ergo.declare('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-dropbox',
		extensions: ['effects', 'popup'],
		
		position: {
			global: true,
			at: 'left bottom'
		},
		effects: {
			show: 'slideDown',
			hide: 'slideUp',
			delay: 300
		},		

		style: {'display': 'none'},
		
		content: {
			etype: 'list',
			defaultItem: {
				onClick: function(e) {
					this.events.bubble('select', {target: this});
				}
			}
		}
		
	}
	
	
	
}, 'dropdown-box');
