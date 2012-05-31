
//= require <widgets/select-box>

Ergo.declare('Ergo.widgets.DropdownSelect', 'Ergo.widgets.SelectBox', {
	
	defaults: {
		
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));
			this.dropdown.close();
		},
		
		components: {
			dropdown: {
				etype: 'dropdown-box',
				adjustWidth: true
			}			
		},
		
		buttons: [{
			iconCls: 'arrow-down'
		}],
		
		onClick: function() {
			this.dropdown.open();
		},
		
		binding: function(v) {
			var selected = this.dropdown.content.items.find(function(item){ return (item.opt('value') == v); });
			this.selection.set(selected);
			this.opt('text', selected ? selected.opt('text') : '');
		}
		
	}
	
}, 'dropdown-select');
