
//= require <core/widget>



/*


Ergo.declare_mixin('Ergo.mixins.Focusable', function(o) {
	
	this.setFocus = function() {
		this.focusManager.enter(this);		
	};
	
	this.hasFocus = function() {
//		return this.states.is('focus');
		return this.focusManager.current == this;
	};
	
	this.clearFocus = function() {
		this.focusManager.clear(this);
	}
	
	this.focusManager = Ergo.mixins.Focusable.focusManager;
	
	Ergo.smart_override(o, {
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
}, 'focusable');



Ergo.mixins.Focusable.focusManager = {
	
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
			w.el.blur();
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
		if(this.current) {
			var code = e.keyCode;
			if($.browser.mozilla) {
				code = code || e.charCode;
			}
			this.current.events.fire('onKeyDown', {keyCode: code}, e);			
		}
//		if(e.keyCode == 27) this.clear();
	}
	
}


if($.browser.msie) {

	$(document).click(function(e){
		// убираем фокус по щелчку левой кнопкой мыши
		if(e.button == 0) Ergo.mixins.Focusable.focusManager.clear();
	});

	$(document).on('keydown', function(e){
		Ergo.mixins.Focusable.focusManager.keypress(e);
	});	
	
}
else {

	$(window).click(function(e){
		// убираем фокус по щелчку левой кнопкой мыши
		if(e.button == 0) Ergo.mixins.Focusable.focusManager.clear();
	});
	
	
	if($.browser.webkit) {
		$(window).on('keydown', function(e){
			Ergo.mixins.Focusable.focusManager.keypress(e);
		});	
	}
	else {
		$(window).on('keypress', function(e){
			Ergo.mixins.Focusable.focusManager.keypress(e);
		});	
	}
	
}


*/



(function(){
	
	var E = Ergo;
	
	
	var _focus = undefined;
	
	
	E.focus = function(w) {
		
		
		if(_focus) {
			_focus.states.unset('focus');
			_focus.events.bubble('focusOut');
		}
		
		if(w) {
			w = E.find_focusable(w.el);
			w.states.set('focus');
			w.events.bubble('focusIn');
		}
		
		_focus = w;
	};
	
	E.find_focusable = function(el) {
		
		var found = null;
		
		$(el).parents().andSelf().each(function(i, el){
			
			var w = $(el).ergo();
			if(w && w.options.focusable) {
				
				found = w;
				
				return false;
			}
		});
		
		return found;
	};
	
	
	E.keypress = function() {
		
	};
	
	
	
	$(window).click(function(e){

		// если фокус установлен на один из элементов
		if(e.button == 0 && _focus) {
			
			var w = E.find_focusable(e.target);
			
			if(!w)
				Ergo.focus();
						
		}
				
		// убираем фокус по щелчку левой кнопкой мыши
//		if(e.button == 0) Ergo.mixins.Focusable.focusManager.clear();
	});
		
		
		
		
	if($.browser.msie) {
	
		$(document).click(function(e){
			// убираем фокус по щелчку левой кнопкой мыши
			if(e.button == 0) Ergo.focus(false);
		});
	
		$(document).on('keydown', function(e){
			Ergo.mixins.Focusable.focusManager.keypress(e);
		});	
		
	}
	else {
	
		$(window).click(function(e){
			// убираем фокус по щелчку левой кнопкой мыши
			if(e.button == 0) Ergo.mixins.Focusable.focusManager.clear();
		});
		
		
		if($.browser.webkit) {
			$(window).on('keydown', function(e){
				Ergo.mixins.Focusable.focusManager.keypress(e);
			});	
		}
		else {
			$(window).on('keypress', function(e){
				Ergo.mixins.Focusable.focusManager.keypress(e);
			});	
		}
		
	}
		
		
	
	
	
})();








