
//= require "../core/layout"



/**
 * @class
 * @name Dino.core.Layouts.StatefulLayout
 * @extends Dino.core.Layout
 */
Dino.declare('Dino.core.Layouts.StatefulLayout', 'Dino.core.Layout', /** @lends Dino.core.Layouts.StatefulLayout.prototype */{
	
	initialize: function(o){
		Dino.core.Layouts.StatefulLayout.superclass.initialize.call(this, o);
		
		this.items = [];
		this.immediateRebuild = true;
	},
	
	insert: function(item, key) {
		this.items.push(item);
		if(this.immediateRebuild) this.rebuild();

	},
	
	remove: function(item) {
		Dino.remove_from_array(this.items, item);
		if(this.immediateRebuild) this.rebuild();
	},
	
	clear: function() {
		Dino.each(this.items, function(item) { item.el.detach(); });
		this.items = [];
	}
	
});