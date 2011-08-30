
//= require "box"

Ergo.declare('Ergo.widgets.GlassPane', 'Ergo.widgets.Box', {
	
//	defaultClass: 'ergo-glass-box',
	
	defaults: {
		html: '<div class="ergo-glass-pane" autoheight="ignore"/>',
		events: {
			'mousedown': function(e) {
				e.preventDefault();
				return false;
			}
			
//    this.glass_panel.bind('click', function(e){
//      self.hide();
//			e.stopPropagation();
//    });
		}
	}
	
}, 'glass-pane');
