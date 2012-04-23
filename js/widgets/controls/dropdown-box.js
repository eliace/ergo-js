
//= require "select-box"
//= require <widgets/dropdown>


Ergo.declare('Ergo.widgets.DropdownBox', 'Ergo.widgets.SelectBox', {
	
	defaults: {
		
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
		
		buttons: [{
			iconCls: 'arrow-down'
		}],
		
		onClick: function() {
			this.dropdown.open();
		}
		
	}
	
}, 'dropdown-box');
