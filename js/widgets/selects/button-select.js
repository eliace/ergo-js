
//= require <widgets/button-group>

Ergo.declare('Ergo.widgets.ButtonSelect', 'Ergo.widgets.Box', {
	
	defaults: {
		mixins: ['selectable'],
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));			
		},
		components: {
			content: {
				etype: 'button-group',
				defaultItem: {
					onClick: function() {
						this.events.bubble('select');
					}
				}				
			}
		},
		binding: function(v) {
			var selected = this.content.items.find(function(item){ return v == item.opt('value'); });
			this.selection.set(selected);
		}		
	}
	
	
}, 'button-select');
