
//= require <widgets/boxes/list-box>

Ergo.declare('Ergo.widgets.ListSelect', 'Ergo.widgets.Box', {
	
	defaults: {
		
		mixins: ['selectable'],
		
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));
		},
		
		components: {
			content: {
				etype: 'list-box'
			}
		},
		
		binding: function(v) {
			var selected = this.content.items.find(function(item){ return item.opt('value') == v; });
			this.selection.set(selected);
		}		
		
	}
	
	
}, 'list-select');
