


Dino.declare('Dino.layouts.FitLayout', 'Dino.layouts.PlainLayout', {
	
	update: function() {

		var dw = this.el.outerWidth() - this.el.width();
		var dh = this.el.outerHeight() - this.el.height();
		
		
//		this.el.height(0);
//		this.el.width(0);
		this.el.hide();
		
		var h = 0;
		var w = 0;
		this.el.parents().each(function(i, el){
			if(!h) h = $(el).height();
			if(!w) w = $(el).width();
			if(w && h) return false;
		});
		
		this.el.siblings().each(function(i, el){
			w -= $(el).outerWidth();
		});

		this.el.width(w - dw);
		this.el.height(h - dh);		

		this.el.show();
	}
	
}, 'fit-layout');
