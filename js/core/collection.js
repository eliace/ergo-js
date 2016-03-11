
//= require object
//= require events

/**
 * Коллекция пар ключ/значение
 *
 * Представляет собой обертку для объектов javascript-класса Object
 *
 * @class
 *
 */
Ergo.core.Collection = function(src) {

	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];

	this._initialize.apply(this, a);
}


$ergo.merge(Ergo.core.Collection.prototype, /** @lends Ergo.core.Collection.prototype */{
// Ergo.core.Collection = Ergo.defineClass('Ergo.core.Collection', 'Ergo.core.Object', /** @lends Ergo.core.Collection.prototype */{
//
// 	defaults: {
// //		plugins: [Ergo.Observable]
// 	},
//
	_initialize: function(src) {
		this.src = src || {};
	},


	_factory: function(v) {
		return new Ergo.core.Collection(v);
	},


	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		if(arguments.length == 1) {
			item = i;
			var old = this.src;
			this.src = item;
//			this.events.fire('value:changed', {'value': item, 'oldValue': old});
		}
		else {
			var old = this.src[i];
			this.src[i] = item;
//			this.events.fire('item:changed', {'item': item, 'index': i, 'oldItem': old});
		}
	},

	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	unset: function(i) {
		this.removeAt(i);
	},

	/**
	 * Получение значения по ключу
	 * @param {Object} i
	 */
	get: function(i) {
		return this.src[i];
	},

	/**
	 * Добавление нового значения
	 * @param {Object} item значение
	 * @param {Object} [i] ключ
	 *
	 * Аналогично по работе методу set
	 */
	// add: function(item, i) {
		// this.src[i] = item;
// //		this.events.fire('item:add', {'item': item});
	// },



	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	removeAt: function(i) {
		var item = this.src[i];
		delete this.src[i];
		return item;

//		this.events.fire('item:removed', {'item': item});
	},

	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		this.removeAt(this.keyOf(item));
		return item;
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод removeAt
	 *
	 * @param {Object} criteria функция-условие
	 *
	 * Значение удаляеся, если результат, возвращаемый criteria равен true
	 */
	removeIf: function(criteria) {
		var keys = Ergo.filterKeys(this.src, criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) {
			removed.push( this.removeAt(keys[i]) );
		}
		return removed;
	},


	/**
	 * Удаление всех элементов коллекции
	 */
	removeAll: function() {
		for(i in this.src) {
			this.removeAt(i);
		}
	},


	clear: function() {
		this.removeAll();
//		this.src = {};
	},

	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 */
	each: function(callback) {
		return $ergo.each(this.src, callback);
	},

//	ensure: function(i) {
//
//	},

	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 */
	find: function(criteria) {
		return Ergo.find(this.src, criteria);
	},

	/**
	 * Поиск всех элементов, удовлетворяющих критерию
	 */
	findAll: function(criteria) {
		return Ergo.findAll(this.src, callback);
	},



	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//

	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this._factory( Ergo.filter(this.src, callback) );
	},

	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this._factory( Ergo.map(this.src, callback) );
	},

	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	contains: function(criteria) {
		return Ergo.contains(this.src, callback);
	},

	// isInclude: function(criteria) {
	// 	return Ergo.contains(this.src, callback);
	// },


	/**
	 * Размер коллекции
	 */
	count: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},

	size: function() {
		return this.count();
	},

	/**
	 * Проверка, является ли коллекция пустой
	 */
	isEmpty: function() {
		return this.count() == 0;
	},

	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	keyOf: function(item) {
		return Ergo.keyOf(this.src, item);
	},

	/**
	 * Вызов для всех элементов коллекции указанного метода
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	applyAll: function(m, args, reverse) {
		$ergo.applyAll(this.src, m, args, reverse);
	},


	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	hasKey: function(i) {
		return (i in this.src);
	},

	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		return Object.keys(this.src);
	},


	/**
	 * Первый элемент коллекции
	 */
	first: function() {
		return this.src[Object.keys(this.src)[0]];
	},

	/**
	 * Последний элемент коллекции
	 */
	last: function() {
		var keys = Object.keys(this.src);
		return this.src[keys[keys.length-1]];
	}


});
