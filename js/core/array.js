
//= require "collection"

/**
 * Коллекция упорядоченных значений
 * 
 */
Dino.declare('Dino.core.Array', 'Dino.core.Collection', {
	
	initialize: function(src, options) {
		Dino.core.Array.superclass.initialize.call(this, src || [], options);
//		this.src = src || [];
//		Dino.Observable.call(this);
//		this.events = new Dino.events.Dispatcher();
	},	
	
	
	/**
	 * Добавить новый элемент
	 * @param {Object} item
	 * @param {Object} i
	 */
	add: function(item, i) {
		if(i == null) {
			this.src.push(item);
			i = this.src.length-1;
		}
		else {
			this.src.splice(i, 0, item);			
		}
			
//		this.events.fire('item:add', {'item': item});
		return i;
	},
	
	/**
	 * Удалить элемент по индексу
	 * @param {Object} i
	 */
	remove_at: function(i) {
		var item = this.src[i]
		this.src.splice(i, 1);
		return item;
//		this.events.fire('item:remove', {'item': item});
	},
	
	size: function() {
		return this.src.length;
	},
	
	clear: function() {
		this.src = [];
	},
	
	/**
	 * Первый элемент коллекции
	 */
	first: function() {
		return this.src[0];
	},
	
	/**
	 * Последний элемент коллекции
	 */
	last: function() {
		return this.src[this.src.length-1];
	},
	
	keys: function() {
		var k = [];
		for(var i = 0; i < this.src.length-1; i++) k.push(i);
		return k;
	}
	
});



