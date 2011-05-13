
//= require <core/widget>

Dino.Clickable = function(o) {
	
	Dino.smart_override(o, {events: {
		'click': function(e, w) {
			w.events.fire('onClick', {button: 0}, e);
		},
		'dblclick': function(e, w) {
			w.events.fire('onDoubleClick', {button: 0}, e);
		}
	}});
	
}





Dino.RClickable = function(o) {
	
	Dino.smart_override(o, {events: {
		'mousedown': function(e, w) {
			// если нажата правая кнопка мыши
			if(e.button == 2) {
				Dino.RClickable.click_timestamp = Dino.timestamp();
			}
		},
		'mouseup': function(e, w) {
			// если отпущена правая кнопка мыши
			if(e.button == 2) {
				var t = Dino.timestamp()
				if(t - Dino.RClickable.click_timestamp < 200) {
					w.events.fire('onClick', {button: 2}, e);					
				}
			}			
		},
		'contextmenu': function(e) {
			return false;
		}
	}});
	
}


Dino.RClickable.click_timestamp = 0;