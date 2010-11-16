
Dino.windowPool = {
	opened: [],
	minZ: 1000,
	
	add: function(window) {
		var max_z = this.minZ;
		for(var i = 0; i < this.opened.length; i++){
			var z = this.opened[i].el.css('z-index');
			if(z) max_z = Math.max(parseInt(z), max_z);
		}
		
		window.el.css('z-index', max_z + 100);
	
		this.opened.push();
	},
	
	remove: function(window) {
		var i = Dino.indexOf(window);
		if(i != -1) this.opened.splice(i, 1);
	}
	
};







Dino.declare('Dino.widgets.Window', 'Dino.containers.Box', {
	
	defaultOptions: {
		renderTo: 'body',
		components: {
			overlay: {
				dtype: 'box',
				cls: 'dino-overlay'
			},
			window: {
				dtype: 'box',
				cls: 'dino-window',
				content: {
					dtype: 'icon',
					cls: 'dino-icon-spinner'
				}
			}
		},
		style: {'display': 'none'},
		delay: 300,
		initialWidth: 200,
		initialHeight: 200
	},
	
	
	_opt: function(o) {
		Dino.widgets.Window.superclass._opt.apply(this, arguments);
		
		var self = this;
		
		if('windowContent' in o) {
			this.window.addComponent('content', o.windowContent);
		}
		
		this.overlay.el.click(function(){
			self.close();
		});
	},
	
	open: function() {
//		this.states.clear('hidden');
//		this.el.show();
		var box = this.window.content;//.getDialogContent();
		
//		this.el.fadeIn(300, function(){
//		});
		
//		Dino.windowPool.add(this);
		
		box.el.css({'visibility': 'hidden'});
		
		this.el.show();
		
				
		var w = box.el.outerWidth();
		var h = box.el.outerHeight();
		
		
		var wnd = this.window;
		
		var o = this.options;
		
		wnd.el.width(o.initialWidth);
		wnd.el.height(o.initialHeight);
		
		wnd.el.css('margin-left', -o.initialWidth/2);
		wnd.el.css('margin-top', -o.initialHeight/2);

		
		wnd.el.animate({width: w, height: h, 'margin-left': -w/2, 'margin-top': -h/2}, o.delay, function(){
			box.el.css({'visibility': ''});
		});
		
		
		box.el.focus();			
		
	},
	
	close: function() {
//		this.states.set('hidden');
		this.el.hide();
//		this.overlay.el.fadeOut(300);
		this.events.fire('onClose');
		
//		Dino.windowPool.remove(this);		
		
		if(this.options.destroyOnClose) this.destroy();
	},
	
	getWindowContent: function() {
		return this.window.content;
	}
	
	
}, 'window');