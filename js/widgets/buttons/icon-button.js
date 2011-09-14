
//= require <widgets/natives/button>
//= require <widgets/images/icon>


Ergo.declare('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {
	
	defaults: {
		cls: 'ergo-icon-button',
		content: {
			etype: 'icon'
		},
		events: {
			'mousedown': function(e, self) {
				self.el.addClass('clicked');
				return false;
			},
			'mouseup': function(e, self) {
				self.el.removeClass('clicked');
			},
			'mouseleave': function(e, self) {
				self.el.removeClass('clicked');
			}
		},
		set: {
			'text': undefined,
			'icon': function(v) { this.content.states.set(v); }
		}			
	}
		
	// $opt: function(o) {
		// Ergo.widgets.IconButton.superclass.$opt.apply(this, arguments);
// 		
		// if('icon' in o) {
			// this.content.states.set(o.icon);
		// }
// 		
	// }

}, 'icon-button');

