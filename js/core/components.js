

/**
 * 
 * @class
 * @extends Dino.BaseObject
 * @param {Dino.Widget} owner
 */
Dino.ComponentCollection = Dino.declare('Dino.ComponentCollection', 'Dino.BaseObject', /** @lends Dino.WidgetCollectionManager.prototype */{
	
	initialize: function(owner) {
		this.widgets = [];
		this.owner = owner;
	},
	
	
	
	add: function(item, i) {
		// добавляем дочерний виджет
		if(arguments.length == 2)
			this.widgets.splice(i, 0, item);
		else
			this.widgets.push(item);
			
		item.parent = this.owner;	
		
		// выполняем автобиндинг
		if(this.owner.data && !item.data)
			item.$bind(this.owner.data, 2);
		
		return item;
	},
	
	get: function(i) {
		return Dino.find(this.widgets, Dino.utils.create_widget_filter(i));	
	},

	get_all: function(i) {		
		return Dino.find_all(this.widgets, Dino.utils.create_widget_filter(i));	
	},
	
	remove: function(item) {
		var i = Dino.index_of(this.widgets, item);
		
		// если такого элемента среди дочерних нет, то возвращаем false
		if(i == -1) return false;
		
		delete this.widgets[i].parent;
		this.widgets.splice(i, 1);
		
		return true;
	},
	
	removeAll: function() {
		this.widgets = [];
	},
	
	each: function(callback) {
		for(var i = 0; i < this.widgets.length; i++){
			var result = callback.call(this.owner, this.widgets[i], i);
			if(result) return result;
		}
	},
	
	size: function() {
		return this.widgets.length;
	},
	
	empty: function(){
		return this.widgets.length == 0;
	}
	
	
	
});
