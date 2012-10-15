
//= require <widgets/panel>
//= require <mixins/window>


Ergo.declare('Ergo.widgets.Dialog', 'Ergo.widgets.Panel', {
	
	defaults: {
		cls:'e-dialog',
		mixins: ['window'],
		closeOnOuterClick: true,
		destroyOnClose: true,
		
		
		components: {
			header: {
				etype: 'header-box'
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
			'ok': {text: 'ОК', cls:'e-ok-btn', tag: 'ok'}
		}
		
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		var button_items = [];
		
		for(var i = 0; i < o.buttons.length; i++) {
			button_items.push( o.buttonShortcuts[o.buttons[i]] );
		}

		o.components.header.tools = button_items;
		
	},
	
	
	
	
	open: function() {
		this.window.open();
		return this;
	},
	
	close: function() {
		this.window.close();
		return this;
	}
	
		
}, 'dialog');



