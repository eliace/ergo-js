
/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.ListBox = Dino.declare('Dino.widgets.ListBox', 'Dino.containers.Box', /** @lends Dino.widgets.List.prototype */{
	
	defaultCls: 'dino-list-box',
	
	defaultOptions: {
    dynamic: true,
		extensions: [Dino.Selectable],
		defaultItem: {
			dtype: 'text-item',
			cls: 'dino-list-box-item'
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.ListBox.superclass.$init.apply(this, arguments);
		
	},
	
	
	
	$opt: function(o) {
		Dino.widgets.ListBox.superclass.$opt.apply(this, arguments);
		
	}
	
	
	
}, 'list-box');


