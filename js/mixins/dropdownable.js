

Ergo.declare_mixin('Ergo.mixins.Dropdownable', {
	
	defaults: {
		
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
		
	},
	
	
	
	setDropdownItems: function(list) {
		
		this.dropdown.content.items.remove_all();
		
		for(var i = 0; i < list.length; i++) {
			this.dropdown.content.items.add( list[i] );
		}
		
	}
	
	
	
}, 'dropdownable');
