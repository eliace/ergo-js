
//= require <widgets/selects/dropdown-select>

Ergo.declare('Ergo.widgets.SelectEditor', 'Ergo.widgets.DropdownSelect', {
	
	defaults: {
		
		cls: 'editor',
		
		onAction: function() {
			if(this.parent) this.parent.stopEdit();
		}
		
	}
	
}, 'select-editor');


