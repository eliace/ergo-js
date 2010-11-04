


Dino.declare('Dino.widgets.LightBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		components: {
			overlay: {
				dtype: 'box',
				cls: 'dino-dialog-overlay'
			},
			content: {
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
		this.constructor.superclass._opt.apply(this, arguments);
		
		var self = this;
		
		this.overlay.el.click(function(){
			self.close();
		});
	},
	
	open: function() {
//		this.states.clear('hidden');
//		this.el.show();
		var content = this.content;
		
//		this.el.fadeIn(300, function(){
//		});
		
		this.el.show();
			
		var w = content.el.width();
		var h = content.el.height();
		
		content.el.css('margin-left', -w/2);
		content.el.css('margin-top', -h/2);

		
		content.el.focus();			
		
	},
	
	close: function() {
//		this.states.set('hidden');
		this.el.hide();
//		this.overlay.el.fadeOut(300);
	}
	
	
}, 'light-box');