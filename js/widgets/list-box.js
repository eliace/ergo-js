
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.ListBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-list-box',
		dynamic: true,
		defaultItem: {
			etype: 'text-item',
			onClick: function(e) {
				this.events.bubble('select');
			}
		}
		
	}
	
}, 'list-box');
