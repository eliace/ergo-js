
//= require <widgets/natives/button>
//= require <widgets/images/icon>


Dino.declare('Dino.widgets.IconButton', 'Dino.widgets.Button', {
	
	defaults: {
		cls: 'dino-icon-button',
		content: {
			dtype: 'icon'
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
		}
	},

	$opt: function(o) {
		Dino.widgets.IconButton.superclass.$opt.apply(this, arguments);
		
		if('icon' in o) {
			this.content.states.set(o.icon);
		}
		
	}

}, 'icon-button');

