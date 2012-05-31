
//= require <mixins/effects>
//= require <mixins/popup>
//= require <widgets/list-box>


Ergo.declare('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-dropdown-box',
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
		
		components: {
			content: {
				etype: 'list-box'
			}
		},

		style: {'display': 'none'}
		
	}
	
	
	
}, 'dropdown-box');
