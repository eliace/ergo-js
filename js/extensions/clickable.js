
Dino.Clickable = function(o) {
	
	o.events = {
		'click': function(e, w) {
			w.events.fire('onClick');
		},
		'dblclick': function(e, w) {
			w.events.fire('onDoubleClick');
		}
	}
	
}
