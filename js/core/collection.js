
/**
 * Коллекция неупорядоченных пар вида <ключ/значение>
 * 
 */
Ergo.declare('Ergo.core.Collection', 'Ergo.core.Object', {
	
	defaults: {
		extensions: [Ergo.Observable]
	},
	
	initialize: function(src, options) {
		Ergo.core.Collection.superclass.initialize.call(this, options);
		this.src = src || {};
	},
	
	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		this.src[i] = item;
	},
	
	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	unset: function(i) {
		delete this.src[i];
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
	 * @param {Object} i ключ (необязательно)
	 * 
	 * Аналогично по работе методу set
	 */
	add: function(item, i) {
		this.src[i] = item;
//		this.events.fire('item:add', {'item': item});
	},
	
	/**
	 * Удаление значения
	 * @param {Object} item значение
	 */
	remove: function(item) {
		this.remove_at(this.index_of(item));
		return item;
	},

	/**
	 * Удаление значения по ключу
	 * @param {Object} i ключ
	 */
	remove_at: function(i) {
		var item = this.src[i];
		delete this.src[i];
		return item;
//		this.events.fire('item:remove', {'item': item});
	},
	
	/**
	 * Удаление значения по условию
	 * @param {Object} criteria функция-условие
	 * 
	 * Значение удаляеся, если результат, возвращаемый criteria равен true 
	 */
	remove_if: function(criteria) {
		var keys = Ergo.filter_keys(this.src, criteria);
		keys.sort().reverse();
		for(var i = 0; i < keys.length; i++) this.remove_at(keys[i]);
	},
	
	/**
	 * Очистка коллекции от всех значений
	 */
	clear: function() {
		this.src = {};
	},
	
	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 * @param {Object} delegate
	 */
	each: function(callback, delegate) {
		Ergo.each(this.src, callback, delegate);
	},
	
//	ensure: function(i) {
//		
//	},
	
	find: function(criteria) {
		return Ergo.find(this.src, criteria);
	},
	
	find_all: function(criteria) {
		return Ergo.filter(this.src, callback);
	},
	
	filter: function(callback) {
		return Ergo.filter(this.src, callback);
	},

	map: function(callback) {
		return Ergo.map(this.src, callback);		
	},
	
	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	include: function(criteria) {
		return Ergo.include(this.src, callback);
	},
	
	/**
	 * Размер коллекции
	 */
	size: function() {
		var n = 0;
		for(var i in this.src) n++;
		return n;
	},
	
	is_empty: function() {
		return this.size() == 0;
	},
	
	/**
	 * Получение ключа элемента
	 * @param {Object} item
	 */
	index_of: function(item) {
		return Ergo.index_of(this.src, item);
	},
	
	/**
	 * @param {Object} m
	 * @param {Object} args
	 */
	apply_all: function(m, args) {
		Ergo.apply_all(this.src, m, args);
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







