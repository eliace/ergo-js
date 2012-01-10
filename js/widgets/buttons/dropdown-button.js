
//= require "text-button"
//= require <widgets/menus/menu-item>


Ergo.declare('Ergo.widgets.DropdownButton', 'Ergo.widgets.TextButton', {
	
	defaults: {
		components: {
			dropdown: {
				etype: 'menu-dropdown-box',
				style: {'display': 'none'},
				hideOn: 'outerClick',
//				renderTo: 'body',
				menuModel: {
					item: {
						// content: {
							// dataId: 'name'
						// },
						onAction: function() {
							this.getParent(Ergo.widgets.DropdownButton).events.fire('onSelect', {target: this});
						}
					}
				},
				position: {
					global: true
				},
				onHide: function() {
					this.parent.states.clear('selected');
				}
			}
		},
		onAction: function() {
			
//			var dd = this.dropdown;
//
//			$('body').append(dd.el);
//			
//			var offset = this.el.offset();
//			dd.show(offset.left, offset.top + this.el.outerHeight());

			this.dropdown.open({at: 'left bottom'});
			
			this.states.set('selected');
//			dd.show(0, this.el.outerHeight());
			
		}
	}
	
	
}, 'dropdown-button');

