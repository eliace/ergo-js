


Dino.declare('Dino.widgets.Dialog', 'Dino.containers.Box', {
	
	defaultOptions: {
		renderTo: 'body',
		components: {
			overlay: {
				dtype: 'box',
				cls: 'dino-dialog-overlay'
			},
			dialogBox: {
				dtype: 'box',
				cls: 'dino-dialog-content'
//				width: 100,
//				height: 100
//				style: {'display': 'none'}
			}
		},
		style: {'display': 'none'}
//		state: 'hidden'
	},
	
	
	_opt: function() {
		Dino.widgets.Dialog.superclass._opt.apply(this, arguments);
		
		var self = this;
		
		this.overlay.el.click(function(){
			self.close();
		});
	},
	
	open: function() {
//		this.states.clear('hidden');
//		this.el.show();
		var box = this.dialogBox;
		
//		this.el.fadeIn(300, function(){
//		});
		
		this.el.show();
			
		var w = box.el.width();
		var h = box.el.height();
		
		box.el.css('margin-left', -w/2);
		box.el.css('margin-top', -h/2);

		
		box.el.focus();			
		
	},
	
	close: function() {
//		this.states.set('hidden');
		this.el.hide();
//		this.overlay.el.fadeOut(300);
		this.events.fire('onClose');
		
		if(this.options.destroyOnClose) this.destroy();
	}
	
	
}, 'dialog');