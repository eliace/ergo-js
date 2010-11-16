

Dino.declare('Dino.widgets.Dialog', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-dialog',
		layout: 'window-layout',
		components: {
			header: {
				dtype: 'box',
				cls: 'dino-widget-header',
				components: {
					title: {
						dtype: 'text-item',
						selectable: false
					}
				}
			},
			content: {
				dtype: 'box'
			},
			buttons: {
				dtype: 'box',
				cls: 'dino-controls',
				defaultItem: {
					dtype: 'text-button',
					state: 'hidden',
					onAction: function() {
						//TODO
					}
				}
			}
		}	
	},
	
	
	_init: function(o) {
		Dino.widgets.Dialog.superclass._init.apply(this, arguments);
		
		var self = this;
		
		this.layout.overlay_el.click(function(){
			self.close();
		});
	},

	_opt: function(o) {
		Dino.widgets.Dialog.superclass._opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
	
	},
	
	
	open: function(){
		this.layout.reset();
		this.el.show();
		this.layout.update();
	},
	
	close: function() {
		this.el.hide();
		if(this.options.destroyOnClose) this.destroy();
	}
	
	
	
	
	
}, 'dialog');