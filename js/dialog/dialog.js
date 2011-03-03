

/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.Dialog = Dino.declare('Dino.widgets.Dialog', 'Dino.containers.Box', /** @lends Dino.widgets.Dialog.prototype */{
	
	defaultOptions: {
		baseCls: 'dino-dialog',
		layout: 'window-layout',
		renderTo: 'body',
		components: {
			header: {
				weight: 1,
				dtype: 'box',
//				cls: 'dino-dialog-header',
				components: {
					title: {
						dtype: 'text-item',
						selectable: false
					}
				}
			},
			content: {
				weight: 2,
//				cls: 'dino-dialog-content',
				dtype: 'box'
			},
			buttons: {
				weight: 3,
				dtype: 'box',
				cls: 'dino-controls center',
				defaultItem: {
					dtype: 'text-button',
					state: 'hidden',
					width: 80,
					onAction: function() {
						var dlg = this.parent.parent;
						dlg.dialogButton = this.tag;
						dlg.close();
					}
				}
			}
		},
//		buttonsAlign: 'center',
		buttonSet: {
			'ok': {text: 'ОК', tag: 'ok'},
			'cancel': {text: 'Отмена', tag: 'cancel'},
			'save': {text: 'Сохранить', tag: 'save'}
		}		
	},
	
	
	$init: function(o) {
		Dino.widgets.Dialog.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		this.layout.overlay_el.click(function(){
			self.close();
		});
		
		var buttons = [];
		for(var i in o.buttonSet)
			buttons.push( o.buttonSet[i] );
		
		o.components.buttons.items = buttons;
		
		this.dialogButton = null;
	},

	$opt: function(o) {
		Dino.widgets.Dialog.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
	
//		if('buttonsAlign' in o) this.buttons.states.set_only(o.buttonsAlign);
		if('buttons' in o) {
			var self = this;
			// формируем указанный порядок кнопок
			Dino.each(o.buttons, function(name){
				self.buttons.layout.el.append( self.buttons.getItem(name).el );
			});
			// включаем указанные кнопки
			this.buttons.eachItem(function(item) {
				item.states.toggle('hidden', !Dino.in_array(o.buttons, item.tag)); 
			});
		}		
	},
	
	
	open: function(){
		
		this.events.fire('onBeforeOpen');

		var self = this;
		this.layout.reset();
		this.el.show();
		this.layout.update(function(){
			self.events.fire('onOpen');
		});
		this.dialogButton = null;
	},
	
	close: function() {
		var e = new Dino.events.CancelEvent();
		
		this.events.fire('onClose', e);
		
		if(!e.isCanceled) {
			this.el.hide();
			if(this.options.destroyOnClose) this.destroy();
		}
	}
	
	
	
	
	
}, 'dialog');