








Dino.declare('Dino.widgets.Dialog', 'Dino.containers.Box', {
	
	defaultOptions: {
		renderTo: 'body',
		components: {
			overlay: {
				dtype: 'box',
				cls: 'dino-dialog-overlay'
			},
			window: {
				dtype: 'box',
				cls: 'dino-dialog-content',
				content: {
					dtype: 'box'
				}
			}
		},
		style: {'display': 'none'}
	},
	
	
	_opt: function(o) {
		Dino.widgets.Dialog.superclass._opt.apply(this, arguments);
		
		var self = this;
		
//		if('dialogContent' in o) {
//			this.window.addComponent('content', o.dialogContent);
//		}
		
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
		
		box.el.css({'visibility': 'hidden'});
		
		this.el.show();
		
				
		var w = box.el.width();
		var h = box.el.height();
		
		
		var wnd = this.window;
		
		wnd.el.width(100);
		wnd.el.height(100);
		
		wnd.el.css('margin-left', -100/2);
		wnd.el.css('margin-top', -100/2);

		wnd.el.animate({width: w, height: h, 'margin-left': -w/2, 'margin-top': -h/2}, 300, function(){
			box.el.css({'visibility': ''});
		});
		
		
		
		box.el.focus();			
		
	},
	
	close: function() {
//		this.states.set('hidden');
		this.el.hide();
//		this.overlay.el.fadeOut(300);
		this.events.fire('onClose');
		
		if(this.options.destroyOnClose) this.destroy();
	}
	
//	getDialogContent: function() {
//		return this.window.content;
//	}
	
	
}, 'dialog');