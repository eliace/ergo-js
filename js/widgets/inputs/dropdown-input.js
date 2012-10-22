
//= require <widgets/input-box>



Ergo.declare('Ergo.widgets.DropdownInput', 'Ergo.widgets.InputBox', {
	
	defaults: {
		
		mixins: ['selectable'],		
		
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
			etype: 'icon-button',
			icon: 'arrow-down'
		}],
		
		defaultItem: {
			onClick: function() {
				this.parent.dropdown.open();
			}
		},
				
		binding: function(v) {
			var selected = this.dropdown.content.items.find(function(item){ return (item.opt('value') == v); });
			if(selected) {
				this.selection.set(selected);
				this.opt('text', selected ? selected.opt('text') : '');
			}
			else {
				this.opt('text', v);
			}
		}
		
	},
	
	
	
	setDropdownItems: function(list) {
		
		this.dropdown.content.items.remove_all();
		
		for(var i = 0; i < list.length; i++) {
			this.dropdown.content.items.add( list[i] );
		}
		
	}
	
}, 'dropdown-input');
