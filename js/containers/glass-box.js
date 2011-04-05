

Dino.declare('Dino.containers.GlassBox', 'Dino.containers.Box', {
	
	defaultClass: 'dino-glass-box',
	
	defaultOptions: {
		events: {
			'mousedown': function(e) {
				e.preventDefault();
				return false;
			}
		}
	}
	
}, 'glass-box');
