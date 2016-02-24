
//= require collection

/**
 * Коллекция упорядоченных значений
 *
 * Представляет собой обертку для объектов javascript-класса Array
 *
 * @class
 * @extends Ergo.core.Collection
 *
 */
Ergo.core.Array = Ergo.defineClass('Ergo.core.Array', /** @lends Ergo.core.Array.prototype */{

	extends: 'Ergo.core.Collection',

	_initialize: function(src, options) {
		Ergo.core.Array.superclass._initialize.call(this, src || []);//, options);
	},


	_factory: function(v) {
		return new Ergo.core.Array(v);
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
			if(i > this.src.length) {
				console.warn('Add item at index greater than array length may cause errors');
			}
			this.src.splice(i, 0, item);
		}

//		this.events.fire('item:added', {'item': item, 'index': i});
		return i;
	},


	/**
	 * Удалить элемент по индексу
	 * @param {Object} i
	 */
	removeAt: function(i) {
		var item = this.src[i];
		this.src.splice(i, 1);
		return item;
//		this.events.fire('item:removed', {'item': item});
	},


	removeAll: function() {
		while(this.src.length)
			this.removeAt(0);
	},

	count: function() {
		return this.src.length;
	},

	// clear: function() {
		// this.src = [];
	// },

	first: function() {
		return this.src[0];
	},

	last: function() {
		return this.src[this.src.length-1];
	},

	keys: function() {
		var k = [];
		for(var i = 0; i < this.src.length-1; i++) k.push(i);
		return k;
	},

	sort: function(comparator) {
		this.src.sort(comparator);
	},

	copy: function() {
		return this._factory(this.src.slice(0));
	}


});
