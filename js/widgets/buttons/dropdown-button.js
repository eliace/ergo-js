
//= require <widgets/items/button-item>


Ergo.declare('Ergo.widgets.DropdownButton', 'Ergo.widgets.ButtonItem', {
	
//	mixins: [Ergo.mixins.Dropdownable],
	
	defaults: {
		xicon: 'button-arrow-down',
		
		mixins: ['selectable'],
		
		onClick: function() {
			this.dropdown.open();
		},
		
		onSelect: function(e) {
			
			var self = this;
			
			this.dropdown.close()
				.then(function(){
//					self.opt('value', e.target.opt('value'));
					self.events.bubble('action', {target: e.target});
				});
			
		},
		
		components: {
			content: {
				autoBind: false
			},
			dropdown: {
				etype: 'dropdown-box',
//				autoBind: false,
				adjustWidth: true
			}
		}
// 		
		// binding: function(v) {
			// var selected = this.dropdown.content.items.find(function(item){ return (item.opt('value') == v); });
			// this.selection.set(selected);
			// this.opt('text', selected ? selected.opt('text') : '');
		// }		
		
		
	},
	
	
	
	// $pre_construct: function(o) {
		// this.$super(o);
// 		
		// if(o.dropdownContent) {
			// Ergo.smart_override(o.components.dropdown, {content: o.dropdownContent});
		// }
// 		
// 		
	// },
	
	
	
	setDropdownItems: function(list) {
		
		this.dropdown.content.items.remove_all();
		
		for(var i = 0; i < list.length; i++) {
			this.dropdown.content.items.add( list[i] );
		}
		
	}
	
	
}, 'dropdown-button');
