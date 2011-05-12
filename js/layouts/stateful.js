
//= require "../core/layout"



/**
 * @class
 * @name Dino.layouts.StatefulLayout
 * @extends Dino.Layout
 */
Dino.declare('Dino.layouts.StatefulLayout', 'Dino.Layout', /** @lends Dino.layouts.StatefulLayout.prototype */{
	
	initialize: function(o){
		Dino.layouts.StatefulLayout.superclass.initialize.call(this, o);
		
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