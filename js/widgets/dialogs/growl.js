
//= require "../containers/control-list"
//= require <layouts/column>
//= require "../buttons/text-button"

Ergo.widgets.Growl = Ergo.declare('Ergo.widgets.Growl', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'ergo-growl ergo-border-all ergo-corner-all ergo-widget-shadow',
		components: {
			content: {
				etype: 'box',
				layout: {
					etype: 'column-layout',
					valign: 'middle'
				},
				components: {
				}		
			},
			buttons: {
				etype: 'control-list',
				cls: 'center',
				defaultItem: {
					etype: 'text-button',
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
		this.$super(o);
//		Ergo.widgets.GrowlBox.superclass.$init.apply(this, arguments);
		
		// Добавляем иконку
		if('icon' in o) {
			o.components.content.components.messageIcon = {
				etype: 'icon',
				cls: 'icon32 ergo-center-align ' + o.icon,
				style: {'margin': '0 10px'}
//				width: 50
			}
		}
		
		// Добавляем сообщение
		if('message' in o) {
			o.components.content.components.messageContent = {
				etype: 'text',
//				cls: 'ergo-widget-content',
				text: o.message
			}			
		}

		// Добавляем html
		if('htmlMessage' in o) {
			o.components.content.components.htmlContent = {
				etype: 'box',
//				html: '<iframe>'+o.htmlMessage+'</iframe>',
//				cls: 'ergo-widget-content',
				innerHtml: o.htmlMessage
			}			
		}
		
		// добавляем кнопки
		if('buttons' in o) {
			var buttons = [];
			Ergo.each(o.buttons, function(key){
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




Ergo.declare('Ergo.widgets.GrowlBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'ergo-growl-box',
		height: 'ignore',
		defaultItem: {
			etype: 'growl',
			onHide: function() {
				this.parent.items.remove(this).destroy(); 				
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
					etype: 'icon',
					cls: 'icon32 ergo-center-align ' + icon,
					width: 50
				},
				messageText: {
					etype: 'text',
					cls: 'ergo-widget-content',
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
					etype: 'icon',
					cls: 'icon32 ergo-center-align ' + icon,
					width: 50
				},
				messageText: {
					etype: 'text',
					cls: 'ergo-widget-content',
					text: msg
				}
			}
		});
		
	},
	
	addHtml: function(html) {
		
	}
*/	
	
	
	
	
}, 'growl-box');








