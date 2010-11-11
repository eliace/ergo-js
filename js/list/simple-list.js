


Dino.declare('Dino.widgets.SimpleList', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-border-all',
		components: {
			content: {
				dtype: 'box',
				cls: 'dino-scrollable-content',
				defaultItem: {
					dtype: 'text-item',
					style: {'display': 'block'}
				}
			},
			toolbar: {
				weight: 1,
				dtype: 'box',
				cls: 'dino-widget-menubar dino-border-top'
			}
		},
		editOnDblClick: false
	},
	
	
	_init: function(o) {
		Dino.widgets.SimpleList.superclass._init.apply(this, arguments);
		
		if('listItems' in o) {
			Dino.utils.overrideOpts(o.components.content, {items: o.listItems});
//			var list_items = [];
//			for(var i = 0; i < o.listItems.length; i++) {
//				var li = o.listItems[i];
//				list_items = {
//					label: li.text
//				};
//			}
		}
		
	}
	
	
	
	
	
	
	
	
	
}, 'simple-list');



