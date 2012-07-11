
//= require "array"


/*
 * Массив виджетов
 * 
 * 
 * @class
 * @name Ergo.core.WidgetArray
 * @extends Ergo.core.Array
 * 
 * 
 */
Ergo.declare('Ergo.core.WidgetChildren', 'Ergo.core.Array', /** @lends Ergo.core.Array.prototype */{
	
	defaults: {
		mixins: [Ergo.Observable]
	},
	
	
	initialize: function(w, o) {
		this.$super(null, o);
//		Ergo.core.WidgetArray.superclass.initialize.call(this, null, o);
		
		this.widget = w;
	},
	
	
	factory: function(o) {
		if($.isString(o)) o = this.options.shortcuts[o] || {text: o};
		return Ergo.widget( Ergo.smart_override({}, this.options.defaultItem, o) );
	},
	
	

	add: function(item, i, type) {		
		
//		var key;
		var w = this.widget;
		
//		item = w.factory(item);
		
		// если не определен тип компонента
		if(type == undefined) {
			// если не определен ключ компонента
			type = (i && $.isString(i)) ? 'component' : 'item';
		}
		
//		type = type || 'item';

		// создаем виджет с помощью фабрики элементов
		if(!(item instanceof Ergo.core.Widget))
			item = (w.options[type+'Factory'] || this.factory).call(w, item);
			
		item._type = type;

		// для элементов с текстовыми ключами (компонентов) сохраняем ключ в поле _key
		if(i && $.isString(i)) {
			item._key = i;
			i = undefined;
		}

		// определяем поле parent
		item.parent = w;
		
		// выполняем иерархическое связывание данных (автобиндинг)
		if(w.data && !item.data)
			item.bind(w.data, false, false);
		
		// добавляем элемент в компоновку с индексом i (для компонентов он равен undefined)
		w.layout.insert(item, i);

		// добавляем элемент в коллекцию
		i = this.$super(item, i);		
		
		// обновляем свойство _index у соседних элементов
		for(var j = i; j < this.src.length; j++)
			this.src[j]._index = j;
		
		//FIXME скорее всего вызов метода show должен находиться не здесь
		if(item.options.showOnRender) item.show();
		if(item.options.hideOnRender) item.hide();
		
		// для элементов с текстовыми ключами (компонентов) добавляем accessor
		if(item._key) {
			w[item._key] = item;
		}
		
		return item;
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		
//		var key;
		var w = this.widget;		
		
		// для компонентов определяем индекс через accessor
		if($.isString(i)) {
//			key = i;
			i = w[i]._index;
		}
		
		
		var item = this.$super(i); //Ergo.core.WidgetArray.superclass.remove_at.call(this, i);
		
		
//		if('hide' in item) item.hide();		
				
		// удаляем элемент из компоновки	
		w.layout.remove(item);
		
		// обновляем свойство _index у соседних элементов
		for(var j = i; j < this.src.length; j++)
			this.src[j]._index = j;
		
		// поля parent, _index и _key больше не нужны
		delete item.parent;
		delete item._index;

		if(item._key) {
			delete w[item._key];
			delete item._key;
		}
		
		return item;
	}
	
	
	// destroy_all: function() {
		// while(this.src.length)
			// this.remove_at(0).destroy();
	// }
	
//	find: function(i) {
//		return Ergo.core.ItemCollection.superclass.find.call(this, Ergo.utils.widget_filter(i));
//	}	
		
});









Ergo.declare('Ergo.core.WidgetComponents', 'Ergo.core.Array', {

	defaults: {
		mixins: [Ergo.Observable]
	},
	
	
	initialize: function(w, o) {
		this.$super(null, o);
		
		this._widget = w;
	},


	_source: function() {
		var result = {};
		var o = this.options;
		this._widget.children.each(function(c) { if(c._type == o.type) result[c._key] = c; });
		return result;
	},
	
	
	
	create: function(v) {
		return new Ergo.core.WidgetComponents(this._widget);
	},
	
	
	/**
	 * Установка значения
	 * @param {Object} i ключ
	 * @param {Object} item значение
	 */
	set: function(i, item) {
		this._widget.children.add(item, i, this.options.type);
	},
	
	
	
	
	/**
	 * Получение значения по ключу
	 * @param {Object} i
	 */
	get: function(i) {
		return this._source()[i];
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
		return this._widget.children.remove_at(i);
	},
	
	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		return this.remove_at(item._index);
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
		var keys = Ergo.filter_keys(this._source(), criteria);
		keys.sort().reverse();
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
	},
	
	/**
	 * Последовательный обход всех значений
	 * @param {Object} callback
	 * @param {Object} delegate
	 */
	each: function(callback, delegate) {
		Ergo.each(this._source(), callback, delegate);
	},
	
//	ensure: function(i) {
//		
//	},
	
	/**
	 * Поиск первого элемента, удовлетворяющего критерию
	 */
	find: function(criteria) {
		return Ergo.find(this._source(), criteria);
	},
	
	/**
	 * Поиск всех элементов, удовлетворяющих критерию
	 */
	find_all: function(criteria) {
		return Ergo.filter(this._source(), callback);
	},
	
	
	
	//
	//TODO методам filter и map имеет смысл возвращать коллекцию, а не значение
	//
	
	/**
	 * Фильтрация элементов
	 */
	filter: function(callback) {
		return this.create( Ergo.filter(this._source(), callback) );
	},

	/**
	 * Отображение элементов
	 */
	map: function(callback) {
		return this.create( Ergo.map(this._source(), callback) );		
	},
	
	/**
	 * Проверка вхождения значения в коллекцию
	 * @param {Object} criteria
	 */
	includes: function(criteria) {
		return Ergo.includes(this._source(), callback);
	},
	
	/**
	 * Размер коллекции
	 */
	size: function() {
		var n = 0;
		var src = this._source();
		for(var i in src) n++;
		return n;
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
		return Ergo.key_of(this._source(), item);
	},
	
	/**
	 * Вызов для всех элементов коллекции указанного метода 
	 *
	 * @param {Object} m
	 * @param {Object} args
	 */
	apply_all: function(m, args) {
		Ergo.apply_all(this._source(), m, args);
	},
	
	
	/**
	 * Проверка наличия элемента с указанным ключом
	 * @param {Object} i ключ
	 */
	has_key: function(i) {
		return (i in this._source());
	},
	
	/**
	 * Список всех ключей в коллекции
	 */
	keys: function() {
		var k = [];
		for(var i in this._source()) k.push(i);
		return k;
	},
	
	
	add: function(item, i) {
		return this._widget.children.add(item, i, this.options.type);
	}
	

});




Ergo.declare('Ergo.core.WidgetItems', 'Ergo.core.WidgetComponents', {

	_source: function() {
		var result = [];
		this._widget.children.each(function(c) { if(!('_key' in c)) result.push(c); });
		return result;
	},
	
	
	
	create: function(v) {
		return new Ergo.core.WidgetItems(this._widget);
	},
	
	
	last: function() {
		var src = this._source();
		return src[src.length-1];		
	},
	
	size: function() {
		var src = this._source();
		return src.length;
	}
	
	
/*	
	set: function(i, item) {
		this._widget.children.add(item, i, 'item');
	},
	
	add: function(item, i) {
		this._widget.children.add(item, i, 'item');
	}
*/	
	
});

