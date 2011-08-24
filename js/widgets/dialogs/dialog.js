
//= require <containers/control-list>
//= require <layouts/window>
//= require <extensions/focusable>
//= require "../panels/panel"
//= require "../buttons/text-button"


/**
 * @class
 * @extends Ergo.containers.ListBox
 */
Ergo.widgets.Dialog = Ergo.declare('Ergo.widgets.Dialog', 'Ergo.widgets.Panel', /** @lends Ergo.widgets.Dialog.prototype */{
	
	defaults: {
		baseCls: 'dino-dialog',
		layout: 'window',
//		renderTo: 'body',
		components: {
			buttons: {
				weight: 30,
				etype: 'control-list',
				cls: 'center',
				defaultItem: {
					etype: 'text-button',
//					state: 'hidden',
					width: 80,
					onAction: function() {
						var dlg = this.parent.parent;
						dlg.dialogButton = this.tag;
						dlg.close();
					},
					extensions: [Ergo.Focusable],
					events: {
						'focus': function(e, w) {
							w.setFocus();
						}
					}
				}
			}
		},
		buttonSet: {
			'ok': {text: 'ОК', tag: 'ok'},
			'cancel': {text: 'Отмена', tag: 'cancel'},
			'save': {text: 'Сохранить', tag: 'save'}
		},
		headerButtonSet: {
			'close': {icon: 'dino-icon-dialog-close', tag: 'close'},
			'minimize': {icon: 'dino-icon-dialog-minimize', tag: 'minimize'},
			'maximize': {icon: 'dino-icon-dialog-maximize', tag: 'maximize'}
		},		
		closeOnOuterClick: false,
		closeOnEsc: false,
		onHeaderButton: function(e) {
			if(e.button == 'close') this.close();
		}
	},
	
	
	$init: function(o) {
		Ergo.widgets.Dialog.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		if(o.closeOnOuterClick) {
			this.layout.overlay_el.click(function(){
				self.close();
			});			
		}

		if(o.closeOnEsc) {
			$(window).keydown(function(e){
				if(e.keyCode == 27) self.close();
			});			
		}
		
//		var buttons = [];
//		for(var i in o.buttonSet)
//			buttons.push( o.buttonSet[i] );
//		
//		o.components.buttons.items = buttons;
		
		this.dialogButton = null;
	},

	$opt: function(o) {
		Ergo.widgets.Dialog.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.opt('title', o.title);
	
//		if('buttonsAlign' in o) this.buttons.states.set_only(o.buttonsAlign);
		if('buttons' in o) {
			var self = this;
			
			this.buttons.items.destroy_all();
			
			Ergo.each(o.buttons, function(name){
				self.buttons.items.add(self.options.buttonSet[name]); //.addItem(self.options.headerButtonSet[name]);//layout.el.append( self.buttons.getItem(name).el );
			});
						
//			// формируем указанный порядок кнопок
//			Ergo.each(o.buttons, function(name){
//				self.buttons.layout.el.append( self.buttons.items.find(name).el );
//			});
//			// включаем указанные кнопки
//			this.buttons.items.each(function(item) {
//				item.states.toggle('hidden', !Ergo.include(o.buttons, item.tag)); 
//			});
		}		
	},
	
	
	open: function(resultCallback){
		
		this.events.fire('onBeforeOpen');

		var self = this;
		this.layout.open();
		this.layout.update(function(){
			self.events.fire('onOpen');
		});
		this.dialogButton = null;
		this.resultCallback = resultCallback;
		this.dialogResult = null;
	},
	
	close: function() {
		var e = new Ergo.events.CancelEvent();
		e.button = this.dialogButton;
		
		this.events.fire('onClose', e);
		
		if(!e.isCanceled) {
			this.layout.close();
			if(this.options.destroyOnClose) this.destroy();
			if(this.dialogResult && this.resultCallback) this.resultCallback.call(this, this.dialogResult);
		}
		
		this.dialogButton = null;
	}
	
	
	
	
	
}, 'dialog');