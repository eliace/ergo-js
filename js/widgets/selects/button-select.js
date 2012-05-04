
//= require <widgets/button-group>

Ergo.declare('Ergo.widgets.ButtonSelect', 'Ergo.widgets.ButtonGroup', {
	
	defaults: {
		mixins: ['selectable'],
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));			
		},
		defaultItem: {
			onClick: function() {
				this.events.bubble('select');
			}
		},
		binding: function(v) {
			var selected = this.items.find(function(item){ return v == item.opt('value'); });
			this.selection.set(selected);
		}		
	}
	
	
}, 'button-select');
