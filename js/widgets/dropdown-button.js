
//= require <widgets/controls/button-item>


Ergo.declare('Ergo.widgets.DropdownButton', 'Ergo.widgets.ButtonItem', {
	
	defaults: {
		xicon: 'button-arrow-down',
		
		onClick: function() {
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			this.dropdown.close();
		},
		
		components: {
			dropdown: {
				etype: 'dropdown-box'
			}
		}
		
		
	}
	
	
}, 'dropdown-button');
