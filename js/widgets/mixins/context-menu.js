

/**
 * Добавляет компонент contextMenu
 * 
 * События:
 * 	`contextMenu`
 * 
 * @mixin Ergo.mixins.ContextMenu
 */

Ergo.alias('includes:context-menu', {

	defaults: {
		components: {
			contextMenu: {
				etype: 'dropdown-menu',
				cls: 'context-menu',
				renderTo: 'body',
				autoBind: false,
				popup: {
					behaviour: 'contextmenu'
				}
			}
		},
		events: {
			'jquery:contextmenu': function(e) {
				
				var x = e.pageX;
				var y = e.pageY;
				
				this.events.rise('contextMenu');
					
				this.contextMenu.open(x, y);
				
				e.preventDefault();			
			}			
		}
	}

});
