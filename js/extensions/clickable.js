
Dino.Clickable = function(o) {
	
	Dino.utils.overrideOpts(o, {events: {
		'click': function(e, w) {
			w.events.fire('onClick');
		},
		'dblclick': function(e, w) {
			w.events.fire('onDoubleClick');
		}
	}});
	
}





Dino.RClickable = function(o) {
	
	Dino.utils.overrideOpts(o, {events: {
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
					w.events.fire('onClick', {button: 2});					
				}
			}			
		},
		'contextmenu': function(e) {
			return false;
		}
	}});
	
}


Dino.RClickable.click_timestamp = 0;