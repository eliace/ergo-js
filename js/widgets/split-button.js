
//= require <widgets/controls/button-box>

Ergo.declare('Ergo.widgets.SplitButton', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-split-button',
		
		defaultItem: {
			etype: 'button-box'
		},
		items: [{
			autoWidth: true
		}, {
			icon: 'button-arrow-down',
			onClick: function() {
				this.parent.dropdown.open();
			}
		}],
		
		onSelect: function(e) {
			this.dropdown.close();
			this.item(0).opt('text', e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'dropdown-box',
				adjustWidth: true
			}
		}			
		
	}
	
}, 'split-button');
