


Ergo.declare('Ergo.widgets.ListSelect', 'Ergo.widgets.Box', {
	
	defaults: {
		
		mixins: ['selectable'],
		
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));
		},
		
		binding: function(v) {
			var selected = this.content.items.find(function(item){ return (item.opt('value') == v); });
			this.selection.set(selected);
		},
		
		components: {
			content: {
				etype: 'list-box'
			}
		}
		
	}
	
	
}, 'list-select');
