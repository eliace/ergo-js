
//= require "core"
//= require "utils"
//= require "collection"



/**
 * 
 * @class
 * @extends Dino.core.Object
 * @param {Dino.Widget} owner
 */
Dino.ComponentCollection = Dino.declare('Dino.ComponentCollection', 'Dino.core.ArrayCollection', /** @lends Dino.WidgetCollectionManager.prototype */{
	
	initialize: function(owner) {
		Dino.ComponentCollection.superclass.initialize.apply(this, []);
//		this.widgets = new Dino.core.ArrayCollection();
		this.owner = owner;
	},
	
	
	
	add: function(item, i) {
		Dino.ComponentCollection.superclass.add.apply(this, arguments);
		
//		// добавляем дочерний виджет
//		if(arguments.length == 2)
//			this.widgets.splice(i, 0, item);
//		else
//			this.widgets.push(item);
			
		item.parent = this.owner;	
		
		// выполняем автобиндинг
		if(this.owner.data && !item.data)
			item.$bind(this.owner.data, 2);
		
		return item;
	},
	
	get: function(i) {
		return this.find(Dino.utils.create_widget_filter(i));
//		return Dino.find(this.widgets, Dino.utils.create_widget_filter(i));	
	},

	get_all: function(i) {
		return this.filter( Dino.utils.create_widget_filter(i) );
//		return Dino.find_all(this.widgets, Dino.utils.create_widget_filter(i));	
	},
	
	remove: function(item) {
		delete item.parent;
		Dino.ComponentCollection.superclass.remove.apply(this, arguments);
//		this.widgets.remove(item);
//		return Dino.remove_from_array(this.widgets, item);
	},
	
	removeAll: function() {
		this.widgets.clear();
//		this.widgets = [];
	}
	
//	each: function(callback) {
//		Dino.ComponentCollection.superclass.each.call(this, callback, this.owner);
////		this.widgets.each(callback, this.owner);
////		for(var i = 0; i < this.widgets.length; i++){
////			var result = callback.call(this.owner, this.widgets[i], i);
////			if(result) return result;
////		}
//	}
	
//	size: function() {
//		this.widgets.length();
////		return this.widgets.length;
//	},
//	
//	empty: function(){
//		this.widgets.is_empty();
////		return this.widgets.length == 0;
//	}
	
	
	
});
