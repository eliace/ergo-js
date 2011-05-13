
//= require "text-button"
//= require <widgets/menus/menu-item>


Dino.declare('Dino.widgets.DropdownButton', 'Dino.widgets.TextButton', {
	
	defaultOptions: {
		components: {
			dropdown: {
				dtype: 'menu-dropdown-box',
				style: {'display': 'none'},
				hideOn: 'outerClick',
//				renderTo: 'body',
				menuModel: {
					item: {
						content: {
							dataId: 'name'							
						},
						onAction: function() {
							this.getParent(Dino.widgets.DropdownButton).events.fire('onSelect', {target: this});
						}
					}
				},
				onHide: function() {
					this.parent.states.clear('selected');
				}
			}
		},
		onAction: function() {
			
			var dd = this.dropdown;

			$('body').append(dd.el);
			
			var offset = this.el.offset();
			dd.show(offset.left, offset.top + this.el.outerHeight());
			
			this.states.set('selected');
//			dd.show(0, this.el.outerHeight());
			
		}
	}
	
	
}, 'dropdown-button');

