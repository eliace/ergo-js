
//= require "../core/layout"



/**
 * @class
 * @name Ergo.layouts.StatefulLayout
 * @extends Ergo.core.Layout
 */
Ergo.declare('Ergo.layouts.StatefulLayout', 'Ergo.core.Layout', /** @lends Ergo.layouts.StatefulLayout.prototype */{
	
	initialize: function(o){
		this.$super(o);
//		Ergo.layouts.StatefulLayout.superclass.initialize.call(this, o);
		
		this.items = [];
		this.immediateRebuild = true;
	},
	
	insert: function(item, key) {
		this.items.push(item);
		if(this.immediateRebuild) this.rebuild();

	},
	
	remove: function(item) {
		Ergo.remove_from_array(this.items, item);
		if(this.immediateRebuild) this.rebuild();
	},
	
	clear: function() {
		Ergo.each(this.items, function(item) { item.el.detach(); });
		this.items = [];
	}
	
}, 'stateful-layout');