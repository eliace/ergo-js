
//= require "icon"


Ergo.widgets.ActionIcon = Ergo.declare('Ergo.widgets.ActionIcon', 'Ergo.widgets.Icon', {

//	defaultCls: 'dino-action-icon',
	
	defaults: {
		opacity: .7,
		states: {
			'hover': function(is_set) {
				this.opt('opacity', is_set ? 1 : .7);
			}
		},
		events: {
			'click': function(e, w){
				w.events.fire('onAction');
				e.stopPropagation();
			}
		}
		
	}
	
}, 'action-icon');


