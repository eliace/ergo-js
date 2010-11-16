

Dino.declare('Dino.widgets.MessageBox', 'Dino.widgets.Window', {
	
	defaultOptions: {
		isModal: true,
		windowContent: {
			dtype: 'box',
			cls: 'dino-window-content',
			components: {
				header: {
					dtype: 'box',
					cls: 'dino-widget-header',
					components: {
						title: {
							dtype: 'text-item'
						}
					}
				},
				body: {
					dtype: 'box',
					components: {
						icon: {
							dtype: 'icon',
							cls: 'dino-messagebox-icon icon32'
						},
						textContent: {
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
						onAction: function() {
							var messageBox = this.getParent(Dino.widgets.MessageBox);
							messageBox.close();
							messageBox.events.fire('onResult', {result: this.tag});
						}
					}
//					states: [{
//						'left': ['left', 'center right'],
//						'center': ['center', 'left right'],
//						'right': ['right', 'center left']
//					}]
				}
			}
		},
		buttonSet: {
			'yes': {text: 'Да', tag: 'yes'},
			'no': {text: 'Нет', tag: 'no'},
			'ok': {text: 'ОК', tag: 'ok'},
			'cancel': {text: 'Отмена', tag: 'cancel'}
		},
		buttonsAlign: 'center',
		iconSet: {
			'info': 'dino-icon-messagebox-info',
			'critical': 'dino-icon-messagebox-critical',
			'warning': 'dino-icon-messagebox-warning'
		}
	},
	
	
	_init: function(o) {
		
//		if('buttons' in o) {
			var buttons = [];
			for(var i in o.buttonSet)
//			for(var i = 0; i < o.buttons.length; i++)
				buttons.push( o.buttonSet[i] );
			
			o.windowContent.components.buttons.items = buttons;
//		}
		
		Dino.widgets.MessageBox.superclass._init.apply(this, arguments);
	},
	
	
	_opt: function(o) {
		Dino.widgets.MessageBox.superclass._opt.apply(this, arguments);
		
		var windowContent = this.getWindowContent();
		
		if('title' in o) windowContent.header.title.opt('text', o.title);
		if('icon' in o) windowContent.body.icon.states.set_only(o.icon);
		if('message' in o) windowContent.body.textContent.opt('text', o.message);
		
		if('buttonsAlign' in o) windowContent.buttons.states.set_only(o.buttonsAlign);
		if('icon' in o) windowContent.body.icon.states.set_only( this.options.iconSet[o.icon] );
		if('buttons' in o) {
			windowContent.buttons.eachItem(function(item) { item.states.toggle('hidden', !Dino.in_array(o.buttons, item.tag)); });
		}
	}
	
	
	
	
}, 'message-box');