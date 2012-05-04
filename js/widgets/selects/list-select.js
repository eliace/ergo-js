
//= require <widgets/list-box>

Ergo.declare('Ergo.widgets.ListSelect', 'Ergo.widgets.ListBox', {
	
	defaults: {
		
		mixins: ['selectable'],
		
		onSelect: function(e) {
			this.opt('value', e.target.opt('value'));
		},
		
		binding: function(v) {
			var selected = this.items.find(function(item){ return item.opt('value') == v; });
			this.selection.set(selected);
		}		
		
	}
	
	
}, 'list-select');
