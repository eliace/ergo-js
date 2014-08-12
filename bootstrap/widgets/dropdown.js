
//= require "button-group"



/**
 *
 * Toggleable, contextual menu for displaying lists of links 
 */
Ergo.defineClass('Bootstrap.widgets.Dropdown', 'Bootstrap.widgets.ButtonGroup', {
	
	etype: 'bootstrap:dropdown',
	
	defaults: {
//		cls: 'dropdown clearfix',
//		mixins: ['easy-popup'],
		components: {
			button: {
				etype: 'bootstrap:button',
				cls: 'dropdown-toggle',
				components: {
					caret: {
						etype: 'html:span',
						cls: 'caret'
					}
				},
				onClick: function(e) {
					this.events.raise('action');
					e.baseEvent.stopPropagation();
					e.baseEvent.preventDefault();
				}
			},
			dropdown: {
				etype: 'bootstrap:dropdown-menu'
			}
		},
		
		onAction: function(e) {
			this.open();
		}
		
	},
	
	setText: function(v) {
		this.button.opt('text', '         '+v+'         ');
	},
	
	
	open: function() {
		
		if(Bootstrap._dropdown)
			Bootstrap._dropdown.close();
		
		var self = this;
		this.states.set('open');
		$('html').one('click', function(){
			self.close();//.states.unset('open');
		});
		Bootstrap._dropdown = this;
	},
	
	close: function() {
		this.states.unset('open');
		Bootstrap._dropdown = false;
	}
	
});


