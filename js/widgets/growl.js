



Dino.declare('Dino.widgets.Growl', 'Dino.Widget', {
	
//	defaultCls: 'dino-growl-box',
	
	defaultOptions: {
		components: {
			icon: {
				dock: 'left',
				dtype: 'icon',
				cls: 'dino-growl-icon'
			}, 
			contentBox: {
				dtype: 'box',
				cls: 'dino-growl-content',
				content: {
					dtype: 'text'
				}
			}, 
			button: {
				dock: 'right',
				dtype: 'box',
				cls: 'dino-growl-button',
				clickable: true,
				onClick: function(e) {
					this.parent.hide();
				}			
			}
		},
		delay: 500,
		cls: 'dino-growl',
		styles: {'display': 'none'},
		layout: 'dock-layout',
		closeOnClick: false
/*		
		components: {
			icon: {
				dtype: 'box',
				cls: 'dino-growl-icon'
			},
			content: {
				dtype: 'box',
				cls: 'dino-growl-content',
				items: [{
					dtype: 'text'
				}]
			},
			closeButton: {
				dtype: 'box',
				cls: 'dino-growl-button',
				clickable: true,
				onClick: function(e) {
					this.parent.hide();
				}
			}
		}
*/		
	},
	
	_events: function(self){
		Dino.widgets.Growl.superclass._events.apply(this, arguments);
		
//		this.el.click(function(){ 
//			self.hide();
//		});
	},
	
	_opt: function(o) {
		Dino.widgets.Growl.superclass._opt.apply(this, arguments);
		
		if('message' in o)
			this.contentBox.content.opt('text', o.message);
		
		if('iconCls' in o)
			this.icon.opt('cls', o.iconCls);
		if('buttonCls' in o)
			this.button.opt('cls', o.buttonCls);
		
		var self = this;
		
		if(o.closeOnClick){
			this.el.click(function(){
				self.hide();
			});
		}
	},
	
	show: function(html){
		this.el.html(html);
		this.el.fadeIn(this.options.delay);
		
		var self = this;
		if('timeout' in this.options)
			setTimeout(function(){ self.hide(); }, this.options.timeout);		
	},
	
	hide: function(){
		var self = this;
		this.el.fadeOut(this.options.delay, function(){ self.events.fire('onHide', {'source': self}); });
	}
	
	
}, 'growl');


// TODO на самом деле этот виджет должен наследовать от списка, а не бокса
Dino.declare('Dino.widgets.GrowlBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		defaultItem: {
			dtype: 'growl',
			components: {
				button: {
					states: {
						'hover': ['', 'dino-off']
					}
				}
			},	
		    buttonCls: 'dino-icon dino-icon-close dino-off',
			onHide: function() {
				if(this.parent) this.parent.removeItem(this);
			}
		}
	},
	
	addMessage: function(msg, type) {
		
		if(arguments.length == 1) type = 'info';
		
		this.addItem({
			cls: 'growl-item-'+type,
			iconCls: 'dino-icon-'+type,
			message: msg
		});
		
	}
	
}, 'growl-box');