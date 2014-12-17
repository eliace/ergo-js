



Ergo.defineClass('Bootstrap.widgets.SplitDropdown', 'Bootstrap.widgets.ButtonGroup', {
	
	etype: 'bootstrap:split-dropdown',
	
	defaults: {
		components: {
			button: {
				etype: 'bootstrap:button',
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}
			},
			button2: {
				etype: 'bootstrap:button',
				cls: 'dropdown-toggle',
				tag: 'button2',
				components: {
					content: {
						etype: 'html:span',
						cls: 'caret',
						
					},
					split: {
						etype: 'html:span',
						cls: 'sr-only',
						text: 'Toggle Dropdown'
					}					
				},
				onClick: function(e) {
					this.events.bubble('action');
					e.baseEvent.stopPropagation();
				}

			},
			dropdown: {
				etype: 'bootstrap:dropdown-menu'
			}
		},
		
		onAction: function(e) {
			if(e.target.tag == 'button2')
				this.open();
		}
		
	},
	
	setText: function(v) {
		this.button.opt('text', v);
	},

	setType: function(v) {
		this.button.states.set(v);
		this.button2.states.set(v);
	},
	
	
	open: function() {
		var self = this;
		this.states.set('open');
		$('html').one('click', function(){
			self.states.unset('open');		
		});
	}
	
});

