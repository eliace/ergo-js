
//= require <core/widget>

//Ergo.Clickable = function(o) {
//	
//	Ergo.smart_override(o, {events: {
//		'click': function(e, w) {
//			w.events.fire('onClick', {button: 0}, e);
//		},
//		'dblclick': function(e, w) {
//			w.events.fire('onDoubleClick', {button: 0}, e);
//		}
//	}});
//	
//}





Ergo.RClickable = function(o) {
	
	Ergo.smart_override(o, {events: {
		'mousedown': function(e, w) {
			// если нажата правая кнопка мыши
			if(e.button == 2) {
				Ergo.RClickable.click_timestamp = Ergo.timestamp();
			}
		},
		'mouseup': function(e, w) {
			// если отпущена правая кнопка мыши
			if(e.button == 2) {
				var t = Ergo.timestamp()
				if(t - Ergo.RClickable.click_timestamp < 200) {
					w.events.fire('onClick', {button: 2}, e);					
				}
			}			
		},
		'contextmenu': function(e) {
			return false;
		}
	}});
	
}


Ergo.RClickable.click_timestamp = 0;