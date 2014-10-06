


Ergo.defineMixin('Ergo.mixins.ContextMenu', function(o) {

	o.components = Ergo.smart_override({
		contextMenu: {
			etype: 'dropdown-list',
			cls: 'context-menu',
			renderTo: 'body',
			autoBind: false,
			popup: {
				behaviour: 'contextmenu'
			}
		}
	}, o.components);
	
	
	o.events = Ergo.smart_override({
		'jquery:contextmenu': function(e, w) {
			
			var x = e.pageX;
			var y = e.pageY;
			
			w.events.rise('contextMenu');
				
			w.contextMenu.open(x, y);
			
			e.preventDefault();			
		}
	}, o.events);
	
	
	Ergo.smart_build(o);	

}, 'mixins:context-menu');