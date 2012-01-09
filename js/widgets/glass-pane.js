
//= require "box"

Ergo.declare('Ergo.widgets.GlassPane', 'Ergo.widgets.Box', {
	
//	defaultClass: 'e-glass-box',
	
	defaults: {
		html: '<div class="e-glass-pane" autoheight="ignore"/>',
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
