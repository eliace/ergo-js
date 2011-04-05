

Dino.Focusable = function(o) {
	
	this.setFocus = function() {
		Dino.Focusable.focusManager.enter(this);		
	};
	
	this.hasFocus = function() {
		return Dino.Focusable.focusManager.current == this;
	};
	
	this.clearFocus = function() {
		Dino.Focusable.focusManager.clear(this);
	}
	
	var self = this;
	this.el.click(function(e) {
		self.setFocus();
		e.stopPropagation();
	});
	
	o.focusable = true;
}



Dino.Focusable.focusManager = {
	
	current: null,
	
	enter: function(w) {
		if(this.current == w) return;
		if(this.current) this.current.states.clear('focus');
		this.current = w;
		w.states.set('focus');
	},
	
	clear: function() {
		this.current = null;
	},
	
	leave: function() {
		if(this.current) this.current.states.clear('focus');
		this.current = null;		
	},
	
	input: function(e) {
		if(this.current) this.current.events.fire('onKeyDown', {keyCode: e.keyCode, baseEvent: e});
		if(e.keyCode == 27) this.leave();
	}
	
}


$(window).click(function(){
	Dino.Focusable.focusManager.leave();
});

$(window).keydown(function(e){
	Dino.Focusable.focusManager.input(e);
});
