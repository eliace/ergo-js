
//= require object
//= require events

/**
 * Коллекция пар ключ/значение
 *
 * Представляет собой обертку для объектов javascript-класса Object
 * 
 * @class
 * @extends Ergo.core.Object
 *  
 */
Ergo.core.Collection = Ergo.declare('Ergo.core.Collection', 'Ergo.core.Object', /** @lends Ergo.core.Collection.prototype */{
	
	defaults: {
//		plugins: [Ergo.Observable]
	},
	
	_initialize: function(src, options) {
//		this._super(options);
		Ergo.core.Collection.superclass._initialize.call(this, options);

//		this.options = options;
//		this.events = new Ergo.events.Observer(this);

		this.src = src || {};
	},
	
	
	create: function(v) {
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
		this.remove_at(i);
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
	remove_at: function(i) {
		var item = this.src[i];
		delete this.src[i];
		return item;
		
//		this.events.fire('item:removed', {'item': item});
	},
	
	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		this.remove_at(this.key_of(item));
		return item;
	},

	/**
	 * Удаление значения по условию
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} criteria функция-условие
	 * 
	 * Значение удаляеся, если результат, возвращаемый criteria равен true 
	 */
	remove_if: function(criteria) {
		var keys = Ergo.filter_keys(this.src, criteria);
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) removed.push( this.remove_at(keys[i]) );
		return removed;
	},
	

	remove_all: function() {
		for(i in this.src)
			this.remove_at(i);
	},
	
	
	/**
	 * Очистка коллекции от всех значений
	 */
	clear: function() {
		this.remove_all();
//		this.src = {};
	},
	
	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 */
	each: function(callback) {
		return Ergo.each(this.src, callback);
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
	find_all: function(criteria) {
		return Ergo.filter(this.src, callback);
	},
	
	
	
	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//
	
	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this.create( Ergo.filter(this.src, callback) );
	},
	
	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this.create( Ergo.map(this.src, callback) );		
	},
	
	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	includes: function(criteria) {
		return Ergo.includes(this.src, callback);
	},

	is_include: function(criteria) {
		return Ergo.includes(this.src, callback);
	},

	
	/**
	 * Размер коллекции
	 */
	size: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},
	
	count: function() {
		return this.size();
	},
	
	/**
	 * Проверка, является ли коллекция пустой
	 */
	is_empty: function() {
		return this.size() == 0;
	},
	
	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	key_of: function(item) {
		return Ergo.key_of(this.src, item);
	},
	
	/**
	 * Вызов для всех элементов коллекции указанного метода 
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	apply_all: function(m, args, reverse) {
		Ergo.apply_all(this.src, m, args, reverse);
	},
	
	
	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	has_key: function(i) {
		return (i in this.src);
	},
	
	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		var k = [];
		for(var i in this.src) k.push(i);
		return k;
	}
	
});







