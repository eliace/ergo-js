
//= require "dialog"



Ergo.declare('Ergo.widgets.QuickDialog', 'Ergo.widgets.Panel', {
	
	defaults: {
		cls: 'e-quick-dialog',
		
		mixins: ['window'],
		closeOnOuterClick: true,
		destroyOnClose: true,
		
		
		components: {
			footer: {
				etype: 'header-box',
				hidden: false,
				components: {
					toolbox: {
						defaultItem: {
							onClick: function(e) {
								if(this.tag) this.events.bubble('dialogAction');
							}
						}
					}
				}
			}
		},
		
		effects: {
			show: 'fadeIn',
			hide: 'fadeOut',
			delay: 400,
			overlay: {
				show: 'fadeIn',
				hide: 'fadeOut',
				delay: 400
			}
		},
		
		buttons: ['ok'],
		
		buttonShortcuts: {
			'cancel': {text: 'Отмена', cls:'e-cancel-btn', tag: 'cancel'},
			'ok': {text: 'ОК', cls:'e-ok-btn', tag: 'ok'},
			'yes': {text: 'Да', cls:'e-yes-btn', tag: 'yes'},
			'no': {text: 'Нет', cls:'e-no-btn', tag: 'no'}
		},
		
		
		onDialogAction: function(e) {
			this._result = e.target.tag;
			this.events.fire(this._result, e);

			if(!e.canceled) 
				this.close();
		},
		
		
		onAfterBuild: function() {
			this.open();
		}
		
		
	},
	
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		var button_items = [];
		
		// for(var i = 0; i < o.buttons.length; i++) {
			// button_items.push( o.buttonShortcuts[o.buttons[i]] );
		// }
		
		for(var i = 0; i < o.buttons.length; i++) {
			if($.isString(o.buttons[i]))
				button_items.push( o.buttonShortcuts[o.buttons[i]] );
			else
				button_items.push( o.buttons[i] );
		}
		

		o.components.footer.components.toolbox.items = button_items;
		
	},
	
	
	
	open: function(callback) {
		this._callback = callback;
		this.window.open();
		return this;
	},
	
	close: function() {
		if(this._callback) this._callback.call(this, this._result);
		this.window.close();
		return this;
	}
	
}, 'quick-dialog');
