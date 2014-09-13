

Ergo.defineClass('Ergo.widgets.DropdownBox', 'Ergo.widgets.Box', {
	
	defaults: {
		mixins: ['dropdown'],
		components: {
			content: {
				// здесь не должен использоваться caret-box
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'html:span',
						cls: 'caret'
					}
				},
				onClick: function(e) {
					this.parent.states.toggle('opened');
					e.baseEvent.stopPropagation();
					e.baseEvent.preventDefault();  //IE11
				}		
			},
			dropdown: {
				weight: 100,
				popup: {
					at: 'left bottom'
				},
				onClosed: function() {
					this.parent.states.unset('opened');
				}
			}
		}
		// states: {
			// 'opened': function(on) {
				// on ? this.dropdown.open() : this.dropdown.close();
			// }
		// }
	},
	
	
	setText: function(v) {
		this.content.opt('text', v);
	}
	
}, 'widgets:dropdown-box');
