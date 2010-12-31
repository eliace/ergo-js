


/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.GrowlBox = Dino.declare('Dino.widgets.GrowlBox', 'Dino.containers.Box', /** @lends Dino.widgets.GrowlBox.prototype */{

	defaultOptions: {
		cls: 'dino-growl-box dino-border-all dino-corner-all dino-widget-shadow',
		components: {
			content: {
				dtype: 'box',
				layout: {
					dtype: 'column-layout',
					valign: 'middle'
				},
				components: {
				}		
			},
			buttons: {
				dtype: 'box',
				cls: 'dino-controls center',
				defaultItem: {
					dtype: 'text-button',
					onAction: function() {
						var growl = this.parent.parent;
						growl.growlButton = this.tag;
						growl.hide();
					}
				}
			}
		},
		state: ['clickable'],
		onClick: function() {
			if(this.options.hideOnClick) this.hide();
		},
		buttonSet: {
			'ok': {text: 'ОК', tag: 'ok'},
			'cancel': {text: 'Отмена', tag: 'cancel'},
			'save': {text: 'Сохранить', tag: 'save'}
		},
		hideOnClick: true,
		hideOnTimeout: true,
		delay: 500,
		timeout: 10000
	},
	
	
	_init: function(o) {
		Dino.widgets.GrowlBox.superclass._init.apply(this, arguments);
		
		// Добавляем иконку
		if('icon' in o) {
			o.components.content.components.messageIcon = {
				dtype: 'icon',
				cls: 'icon32 dino-center-align ' + o.icon,
				width: 50				
			}
		}
		
		// Добавляем сообщение
		if('message' in o) {
			o.components.content.components.messageContent = {
				dtype: 'text',
				cls: 'dino-widget-content',
				text: o.message
			}			
		}

		// Добавляем html
		if('htmlMessage' in o) {
			o.components.content.components.htmlContent = {
				dtype: 'box',
//				html: '<iframe>'+o.htmlMessage+'</iframe>',
				cls: 'dino-widget-content',
				innerHtml: o.htmlMessage
			}			
		}
		
		// добавляем кнопки
		if('buttons' in o) {
			var buttons = [];
			Dino.each(o.buttons, function(key){
				buttons.push( o.buttonSet[key] );
			})
			o.components.buttons.items = buttons;
		}		
		
	},
	
	
	show: function() {
		var o = this.options;
		
		this.el.fadeIn(o.delay);
		
		var self = this;
		if(o.hideOnTimeout){
			setTimeout(function(){ self.hide(); }, o.timeout);			
		}
	},
	
	
	hide: function() {
		var o = this.options;
		var self = this;
		this.el.fadeOut(o.delay, function(){ self.events.fire('onHide', {'source': self});});
	}
	
}, 'growl-box');




Dino.declare('Dino.widgets.Growl', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-growl',
		height: 'ignore',
		defaultItem: {
			dtype: 'growl-box',
			onHide: function() {
				this.parent.destroyItem(this); 				
			}
		}
	}
	
	
/*	
	addMessage: function(msg, icon, boxState) {
		
		var o = this.options;
		
		this.addItem({
			delay: o.delay,
			timeout: o.timeout,
			hideOnTimeout: o.hideOnTimeout,
			state: boxState,
			hideOnClick: true,
			components: {
				messageIcon: {
					dtype: 'icon',
					cls: 'icon32 dino-center-align ' + icon,
					width: 50
				},
				messageText: {
					dtype: 'text',
					cls: 'dino-widget-content',
					text: msg
				}
			}
		});
		
	},
	
	addPrompt: function(icon, msg, buttons) {

		var o = this.options;
		
		this.addItem({
			delay: o.delay,
			timeout: o.timeout,
			hideOnTimeout: o.hideOnTimeout,
			state: boxState,
			hideOnClick: true,
			components: {
				messageIcon: {
					dtype: 'icon',
					cls: 'icon32 dino-center-align ' + icon,
					width: 50
				},
				messageText: {
					dtype: 'text',
					cls: 'dino-widget-content',
					text: msg
				}
			}
		});
		
	},
	
	addHtml: function(html) {
		
	}
*/	
	
	
	
	
}, 'growl');





/*
Dino.declare('Dino.widgets.Growl', 'Dino.Widget', {
	
	_html: function() { return '<div></div>'; },
	
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
		closeOnClick: false,
		timeout: 5000

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
			this.contentBox.content.opt('innerHtml', o.message);
		
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
		
		var o = this.options;
		
		this.el.html(html);
		this.el.fadeIn(o.delay);
		
		var self = this;
		if(o.hideOnTimeout){
			setTimeout(function(){ self.hide(); }, o.timeout);			
		}
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

*/



/*
 * hideOnTimeout
 * 
 */
function init_default_growl(o) {

	o = o || {};
/*	
	Dino.messagePanel = $.dino({
		dtype: 'growl-box',
		cls: 'message-panel',
		defaultItem: {
			delay: 600,
			hideOnTimeout: o.hideOnTimeout,
			timeout: ('timeout' in o) ? o.timeout : 5000,
			cls: 'dino-border-all dino-corner-all',
			closeOnClick: true,
			components: {
				button: {
					cls: 'dino-hidden'
				}
			}
		},
		renderTo: 'body'	
	});	
*/

	Dino.growl = $.dino({
		dtype: 'growl',
		renderTo: 'body'
	});


	growl = {
			info: function(m) {this.msg(m, 'info');},
			err: function(m) {this.msg(m, 'critical');},
			warn: function(m) {this.msg(m, 'warning');},
			html: function(m) { Dino.growl.addItem({html: m, icon: 'dino-icon-growlbox-info'}) },
			msg: function(m, type) {
				var s = (Dino.isString(m)) ? m : Dino.pretty_print(m);
				Dino.growl.addItem({
					message: s,
					icon: 'dino-icon-growlbox-'+type,
					state: type
				});
//				Dino.messagePanel.addMessage(s, type);		
			}
		}
	
}



