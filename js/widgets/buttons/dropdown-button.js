
//= require <widgets/boxes/button-box>

Ergo.defineClass('Ergo.widgets.DropdownButton', 'Ergo.widgets.ButtonBox', {
	
	defaults: {
		baseCls: 'dropdown-button',
		components: {
			button: {
				etype: 'button',
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'html:span',
						cls: 'caret'						
					}
				},
				onClick: function(e) {
		//			this.states.is('opened') ? 
					this.parent.states.toggle('opened');
					e.baseEvent.stopPropagation();
				}		
			},
			dropdown: {
				etype: 'dropdown-menu',
				weight: 100,
				popup: {
					at: 'left bottom'
				},
				onClosed: function() {
					this.parent.states.unset('opened');
				}
			}
		},
		states: {
			'opened': function(on) {
				on ? this.dropdown.open() : this.dropdown.close();
			}
		}
	},
	
	
	setText: function(v) {
		this.button.opt('text', v);
	}
	
}, 'widgets:dropdown-button');
