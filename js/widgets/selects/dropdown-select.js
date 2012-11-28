
//= require <widgets/select-box>

Ergo.declare('Ergo.widgets.DropdownSelect', 'Ergo.widgets.SelectBox', {
	
	defaults: {
		
		mixins: ['dropdownable'],
		
/*		
		onSelect: function(e) {
			
			var self = this;
			
			this.dropdown.close()
				.then(function(){
					self.opt('value', e.target.opt('value'));
					self.events.bubble('action');
				});
		},
		
		components: {
			dropdown: {
				etype: 'dropdown-box',
				adjustWidth: true,
				autoBind: false
			}			
		},
*/		
		buttons: [{
			etype: 'icon-button',
			icon: 'arrow-down'
		}],
		
		onClick: function() {
			this.dropdown.open();
		}
/*		
		binding: function(v) {
			
			var selected = null;
			this.dropdown.walk(function(item){
				if(item.opt('value') == v) {
					selected = item;
					return false;
				}
			});
			
//			var selected = this.dropdown.content.items.find(function(item){ return (item.opt('value') == v); });
			this.selection.set(selected);
			this.opt('text', selected ? selected.opt('text') : '');
		}
*/		
	},
	
	
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		if(o.dropdownContent) {
			Ergo.smart_override(o.components.dropdown, {content: o.dropdownContent});
		}
		
		
	}
	
	
	
	
	
/*	
	setDropdownItems: function(list) {
		
		this.dropdown.content.items.remove_all();
		
		for(var i = 0; i < list.length; i++) {
			this.dropdown.content.items.add( list[i] );
		}
		
	}
*/	
}, 'dropdown-select');
