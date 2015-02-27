
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.ListBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-list-box',
		dynamic: true,
		defaultItem: {
			onClick: function(e) {
				this.events.bubble('select');
			}
		}
		
	}
	
}, 'list-box');
