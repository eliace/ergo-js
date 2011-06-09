
//= require <core/widget>


Dino.Focusable = function(o) {
	
	this.setFocus = function() {
		Dino.Focusable.focusManager.enter(this);		
	};
	
	this.hasFocus = function() {
//		return this.states.is('focus');
		return Dino.Focusable.focusManager.current == this;
	};
	
	this.clearFocus = function() {
		Dino.Focusable.focusManager.clear(this);
	}
	
	Dino.smart_override(o, {
		events: {
			'click': function(e, w) {
				w.setFocus();
				e.stopPropagation();
			}			
		}
	})
	
//	var self = this;
//	this.el.click(function(e) {
//		self.setFocus();
//		e.stopPropagation();
//	});
	
	o.focusable = true;
}



Dino.Focusable.focusManager = {
	
	current: null,
	
	enter: function(w) {
		if(this.current == w) return;
		var w_old = this.current;
		this.current = w;
		if (w_old) {
			w_old.states.clear('focus');
			w_old.events.fire('onBlur');
		}
		w.states.set('focus');
		w.events.fire('onFocus');
	},
	
	clear: function() {
		var w = this.current;
		this.current = null;
		if(w) {
			w.states.clear('focus');
			w.events.fire('onBlur');
		}		
	},
	
//	leave: function() {
//		if(this.current) {
//			this.current.states.clear('focus');
//			this.current.events.fire('onBlur');
//		}
//		this.current = null;		
//	},
	
	keypress: function(e) {
		if(this.current) 
			this.current.events.fire('onKeyDown', {keyCode: e.keyCode}, e);
//		if(e.keyCode == 27) this.clear();
	}
	
}


if($.browser.msie) {

	$(document).click(function(e){
		// убираем фокус по щелчку левой кнопкой мыши
		if(e.button == 0) Dino.Focusable.focusManager.clear();
	});

	$(document).bind('keydown', function(e){
		Dino.Focusable.focusManager.keypress(e);
	});	
	
}
else {

	$(window).click(function(e){
		// убираем фокус по щелчку левой кнопкой мыши
		if(e.button == 0) Dino.Focusable.focusManager.clear();
	});
	
	
	if($.browser.webkit) {
		$(window).bind('keydown', function(e){
			Dino.Focusable.focusManager.keypress(e);
		});	
	}
	else {
		$(window).bind('keypress', function(e){
			Dino.Focusable.focusManager.keypress(e);
		});	
	}
	
}

