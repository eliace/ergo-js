
//= require "select-box"
//= require <widgets/natives/list>

Ergo.declare('Ergo.widgets.ListBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-list-box',
		
		components: {
			content: {
				etype: 'list',
				dynamic: true,
				defaultItem: {
					onClick: function(e) {
						this.events.bubble('select');
					}
				}
			}
		}
		
	}
	
}, 'list-box');
