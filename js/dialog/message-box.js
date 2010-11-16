

Dino.declare('Dino.widgets.MessageBox', 'Dino.widgets.Dialog', {
	
	defaultOptions: {
		components: {
			content: {
				dtype: 'box',
				layout: {
					dtype: 'column-layout',
					valign: 'middle'
				},
				components: {
					icon: {
						dtype: 'icon',
						cls: 'dino-messagebox-icon icon32'
					},
					message: {
						dtype: 'text'
					}
				}	
			},
			buttons: {
				dtype: 'box',
				cls: 'dino-controls',
				defaultItem: {
					dtype: 'text-button',
					state: 'hidden',
					width: 80,
					onAction: function() {
						var messageBox = this.getParent(Dino.widgets.MessageBox);
						messageBox.close();
						messageBox.events.fire('onResult', {result: this.tag});
					}
				}
			}
		},
	
		buttonsAlign: 'center',
		buttonSet: {
			'yes': {text: 'Да', tag: 'yes'},
			'no': {text: 'Нет', tag: 'no'},
			'ok': {text: 'ОК', tag: 'ok'},
			'cancel': {text: 'Отмена', tag: 'cancel'}
		},
		iconSet: {
			'info': 'dino-icon-messagebox-info',
			'critical': 'dino-icon-messagebox-critical',
			'warning': 'dino-icon-messagebox-warning'
		}
	},
	
	
	_init: function(o) {
		Dino.widgets.MessageBox.superclass._init.apply(this, arguments);
		
//		if('buttons' in o) {
			var buttons = [];
			for(var i in o.buttonSet)
//			for(var i = 0; i < o.buttons.length; i++)
				buttons.push( o.buttonSet[i] );
			
			o.components.buttons.items = buttons;
//		}
		
	},
	
	
	_opt: function(o) {
		Dino.widgets.MessageBox.superclass._opt.apply(this, arguments);
		
		if('icon' in o) this.content.icon.states.set_only(this.options.iconSet[o.icon]);
		if('message' in o) this.content.message.opt('text', o.message);
		
		if('buttonsAlign' in o) this.buttons.states.set_only(o.buttonsAlign);
		if('buttons' in o) {
			this.buttons.eachItem(function(item) { item.states.toggle('hidden', !Dino.in_array(o.buttons, item.tag)); });
		}
	}
	
	
	
	
}, 'message-box');