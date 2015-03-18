

/**
 * Добавляет компонент contextMenu
 * 
 * События:
 * 	`contextMenu`
 * 
 * @mixin Ergo.mixins.ContextMenu
 */
Ergo.defineMixin('Ergo.mixins.ContextMenu', function(o) {

	o.components = Ergo.smart_override({
		contextMenu: {
			etype: 'dropdown-menu',
			cls: 'context-menu',
			renderTo: 'body',
			autoBind: false,
			popup: {
				behaviour: 'contextmenu'
			}
		}
	}, o.components);
	
	
	o.events = Ergo.smart_override({
		'jquery:contextmenu': function(e) {
			
			var x = e.pageX;
			var y = e.pageY;
			
			this.events.rise('contextMenu');
				
			this.contextMenu.open(x, y);
			
			e.preventDefault();			
		}
	}, o.events);
	
	
//	Ergo.smart_build(o);	

}, 'mixins:context-menu');