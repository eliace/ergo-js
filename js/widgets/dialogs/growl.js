
//= require "../../containers/control-box"
//= require "../../layouts/column"
//= require "../buttons/text-button"

Dino.widgets.Growl = Dino.declare('Dino.widgets.Growl', 'Dino.Widget', {

	defaultOptions: {
		html: '<div/>',
		cls: 'dino-growl dino-border-all dino-corner-all dino-widget-shadow',
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
				dtype: 'control-box',
				cls: 'center',
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
		events: {
			'click': function(e, w) {
				if(w.options.hideOnClick) w.hide();
			}
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
	
	
	$init: function(o) {
		Dino.widgets.GrowlBox.superclass.$init.apply(this, arguments);
		
		// Добавляем иконку
		if('icon' in o) {
			o.components.content.components.messageIcon = {
				dtype: 'icon',
				cls: 'icon32 dino-center-align ' + o.icon,
				style: {'margin': '0 10px'}
//				width: 50
			}
		}
		
		// Добавляем сообщение
		if('message' in o) {
			o.components.content.components.messageContent = {
				dtype: 'text',
//				cls: 'dino-widget-content',
				text: o.message
			}			
		}

		// Добавляем html
		if('htmlMessage' in o) {
			o.components.content.components.htmlContent = {
				dtype: 'box',
//				html: '<iframe>'+o.htmlMessage+'</iframe>',
//				cls: 'dino-widget-content',
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
	
}, 'growl');




Dino.declare('Dino.widgets.GrowlBox', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-growl-box',
		height: 'ignore',
		defaultItem: {
			dtype: 'growl',
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
	
	
	
	
}, 'growl-box');








