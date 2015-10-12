
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
Ergo.core.Array = Ergo.declare('Ergo.core.Array', 'Ergo.core.Collection', /** @lends Ergo.core.Array.prototype */{

	_initialize: function(src, options) {
//		this._super(src || [], options);
		Ergo.core.Array.superclass._initialize.call(this, src || [], options);
//		this.src = src || [];
//		Ergo.Observable.call(this);
//		this.events = new Ergo.events.Dispatcher();
	},


	create: function(v) {
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
			this.src.splice(i, 0, item);
		}

//		this.events.fire('item:added', {'item': item, 'index': i});
		return i;
	},


	/**
	 * Удалить элемент по индексу
	 * @param {Object} i
	 */
	remove_at: function(i) {
		var item = this.src[i];
		this.src.splice(i, 1);
		return item;
//		this.events.fire('item:removed', {'item': item});
	},


	remove_all: function() {
		while(this.src.length)
			this.remove_at(0);
	},

	size: function() {
		return this.src.length;
	},

	// clear: function() {
		// this.src = [];
	// },

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
	},

	sort: function(comparator) {
		this.src.sort(comparator);
	},

	copy: function() {
		return this.create(this.src.slice(0));
	}


});
