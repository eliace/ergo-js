

Dino.declare('Dino.containers.GlassBox', 'Dino.containers.Box', {
	
//	defaultClass: 'dino-glass-box',
	
	defaultOptions: {
		html: '<div class="dino-glass-box" autoheight="ignore"/>',
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
	
}, 'glass-box');
