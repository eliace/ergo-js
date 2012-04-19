
//= require "select-field"


Ergo.declare('Ergo.widgets.DropdownSelectField', 'Ergo.widgets.SelectField', {
	
	defaults: {
		
		extensions: ['selectable'],
		
		onSelect: function(e) {
			this.selection.set(e.target);
			this.dropdown.close();
		},
		
		components: {
			dropdown: {
				etype: 'dropdown',
				adjustWidth: true
			}			
		},
		
		onClick: function() {
			this.dropdown.open();
		}
		
	}
	
}, 'dropdown-select-field');
