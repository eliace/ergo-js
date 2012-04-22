
//= require "select-field"


Ergo.declare('Ergo.widgets.ListSelectField', 'Ergo.widgets.SelectField', {
	
	defaults: {
		
		cls: 'e-dropbox',
		
		mixins: ['selectable'],
		
		content: {
			etype: 'list',
			defaultItem: {
				onClick: function() {
					this.events.bubble('select');
				}
			}
		},
		
		onSelect: function(e) {
			this.selection.set(e.target);
		}
		
	}
	
}, 'list-select-field');
