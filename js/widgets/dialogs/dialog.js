
//= require <widgets/panel>
//= require <mixins/window>


Ergo.declare('Ergo.widgets.Dialog', 'Ergo.widgets.Panel', {
	
	defaults: {
		cls:'e-dialog',
		mixins: ['window'],
		closeOnOuterClick: true,
		destroyOnClose: true,
		autoHeight: 'ignore',
		
		
		components: {
			header: {
				etype: 'header-box',
				components: {
					toolbox: {
						defaultItem: {
							onClick: function() {
								if(this.tag) this.events.bubble('action');
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
		
		buttons: [],
		
		buttonShortcuts: {
			'cancel': {text: 'Отмена', cls:'e-cancel-btn', tag: 'cancel'},
			'ok': {text: 'ОК', cls:'e-ok-btn', tag: 'ok'},
			'yes': {text: 'Да', cls:'e-yes-btn', tag: 'yes'},
			'no': {text: 'Нет', cls:'e-no-btn', tag: 'no'}
		},
		
		
		onAction: function(e) {
			this._result = e.target.tag;
			
			var e = new Ergo.events.Event();
			this.events.fire(this._result, e);
			
			if(!e.canceled) 
				this.close();
		}		
		
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		var button_items = [];
		
		for(var i = 0; i < o.buttons.length; i++) {
			if($.isString(o.buttons[i]))
				button_items.push( o.buttonShortcuts[o.buttons[i]] );
			else
				button_items.push( o.buttons[i] );
		}

		o.components.header.components.toolbox.items = button_items;
		
	},
	
	
	
	
	open: function() {
		this.window.open();
		return this;
	},
	
	close: function() {
		this.window.close();
		return this;
	},
	
	
	button: function(i) {
		return this.header.toolbox.item(i);
	}
	
		
}, 'dialog');



