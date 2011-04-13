
/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.ListBox = Dino.declare('Dino.widgets.ListBox', 'Dino.containers.Box', /** @lends Dino.widgets.List.prototype */{
	
	defaultCls: 'dino-list-box',
	
	defaultOptions: {
//		cls: 'dino-border-all',
//		components: {
//			content: {
//				weight: 2,
//				dtype: 'box',
//				state: 'scrollable',
	      dynamic: true,
				defaultItem: {
					dtype: 'text-item',
					cls: 'dino-list-box-item'
//					style: {'display': 'block'}
//					xicon: true,
//					components: {
//						rightIcon: {
//							cls: 'ui-icon ui-icon-close dino-clickable',
//							states: {
//								'hover': ['ui-icon-closethick', 'ui-icon-close']
//							},
//							clickable: true
//						}
//					},
//					clickable: true,
//					onDblClick: function() {
//						if(this.parent.parent.options.editOnDblClick) {
//							this.startEdit();
//						}
//					}
				},
//			}
//			controls: {
//				dtype: 'box',
//				cls: 'dino-list-menu dino-border-top',
//				defaultItem: {
//					dtype: 'text-button',
//					cls: 'dino-list-menu-item'
//				}
//			}
//		},
		editOnDblClick: false
	},
	
	
	$init: function(o) {
		Dino.widgets.ListBox.superclass.$init.apply(this, arguments);
		
//		if('listItems' in o) {
//			Dino.utils.overrideOpts(o.components.content, {items: o.listItems});
//		}
//		
//		if('defaultListItem' in o) {
//			Dino.utils.overrideOpts(o.components.content.defaultItem, o.defaultListItem);			
//		}
		
//		if('controls' in o) {
//			var toolbar_items = [];
//			for(var i = 0; i < o.controls.length; i++) {
//				var item = o.controls[i];
//				if(Dino.isString(item)) item = {label: item};
//				toolbar_items.push(item);
//			}
//			Dino.utils.overrideOpts(o.components.controls, {items: toolbar_items});			
//		}
		
	},
	
	
	
	$opt: function(o) {
		Dino.widgets.ListBox.superclass.$opt.apply(this, arguments);
		
//		if('contentHeight' in o) this.content.opt('height', o.contentHeight);
				
	}
	
	
	
	
	
	
	
	
	
}, 'list-box');



