
//= require array



/**
 * Массив виджетов
 *
 *
 * @class
 * @name Ergo.core.WidgetChildren
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.declare('Ergo.core.WidgetChildren', 'Ergo.core.Array', /** @lends Ergo.core.WidgetChildren.prototype */{

	defaults: {
//		plugins: [Ergo.Observable]
//		include: 'observable'
	},


	_initialize: function(w, o) {
//		this._super(null, o);

//		Ergo.core.WidgetArray.superclass._initialize.call(this, null, o);

		this.options = o || {};
		this.src = [];
//		this.events = new Ergo.events.Observer(this);

		this.autobinding = true;

		this.widget = w;
	},


	factory: function(o, type) {
		var default_opt = this.options.defaultOpt || 'text';
		if($.isString(o)) {
			var v = o;
			o = (this.options.shortcuts || {})[v];
			if(!o) {
				o = {};
				o[default_opt] = v;//{text: o};
			}
		}
		else if($.isArray(o)) o = {items: o};
		var default_child = 'default' + type[0].toUpperCase() + type.substr(1);
		default_child = this.options[default_child];
		if( $.isString(default_child) )
			default_child = {etype: default_child};

		return $.ergo( [default_child, o] );//, null, this.scope );
//		return $.ergo( Ergo.smart_override({}, this.options[default_child], o) );
	},



	add: function(item, i, type) {

//		console.log('i', i);

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
			item = (w.options[type+'Factory'] || this.factory).call(w, item, type);

		item._type = type;

		// для элементов с текстовыми ключами (компонентов) сохраняем ключ в поле _key
		if(i && $.isString(i)) {
			item._key = i;
			i = undefined;
		}
		else {
			item._index = i;
		}

		// определяем поле parent
		item.parent = w;

		// добавляем элемент в компоновку с индексом i (для компонентов он равен undefined)
		if(item.options.autoRender === true)
			w.layout.add(item, item._index);//i);

		// определяем индекс элемента в children
		if(i != null && ('_index' in item)) {//item._index) {
			// FIXME здесь нужно немного эвристики
			// if(this.src[this.src.length-1]._index < item._index)
				// i =
			for(i = this.src.length-1; i >= 0; i--) {
				if(('_index' in this.src[i]) && this.src[i]._index < item._index) {
//					i--;
//					i++;
					break;
				}
			}

			i++;
		}
		else if(i == null && ('_index' in item)) {
			// FIXME последний индекс лучше сохранять после пересчета
			item._index = 0;
			for(var j = this.src.length-1; j >= 0; j--) {
				if(this.src[j]._type == item._type) {
					item._index = this.src[j]._index + 1;
					item.el[0]._index = item._index; //WARN это действие должно осуществляться в layout
					break;
				}
			}
		}

//		var i0 = i;


//		console.log('i', i);
		// добавляем элемент в коллекцию
//		i = this._super(item, i);
		i = Ergo.core.WidgetChildren.superclass.add.call(this, item, i);



//		console.log(i0 + ' > '+i);

		// обновляем свойство _index у соседних элементов
		for(var j = i+1; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index++;
				this.src[j].el[0]._index++; //WARN это действие должно осуществляться в layout
			}
		}
//			this.src[j]._index = j;

		//FIXME скорее всего вызов метода show должен находиться не здесь
		// if(item.options.autoRender === true) {
			// if(item.options.showOnRender) item.show();
			// if(item.options.hideOnRender) item.hide();
		// }

		// для элементов с текстовыми ключами (компонентов) добавляем accessor
		if(item._key) {
			w[item._key] = item;
			w['$'+item._key] = item;
		}

		// выполняем иерархическое связывание данных (автобиндинг)
		if(w.data && !item.data && this.autobinding)
			item.bind(w.data, false, false);



//		console.log('item:add');
		//TODO здесь бы применить метод вызова опций как для компоновки
		this.widget.events.fire('item:added', {'item': item});

		return item;
	},

	remove_at: function(i) {

//		var key;
		var w = this.widget;

		// // для компонентов определяем индекс через accessor
		// if($.isString(i)) {
// //			key = i;
			// i = w[i]._index;
		// }


//		var item = this._super(i);
		var item = Ergo.core.WidgetChildren.superclass.remove_at.call(this, i);


//		if('hide' in item) item.hide();

		// обновляем свойство _index у соседних элементов
		for(var j = i; j < this.src.length; j++) {
			if('_index' in this.src[j]) {
				this.src[j]._index--;
				this.src[j].el[0]._index--;
			}
		}

//			this.src[j]._index = j;

		// поля parent, _index и _key больше не нужны
		delete item.parent;
		delete item._index;

		if(item._key) {
			delete w['$'+item._key];
			delete w[item._key];
			delete item._key;
		}


		// if(item.options.hideOnDestroy) {
			// item.hide().then(function(){ w.layout.remove(item); });
		// }
		// else {
			// удаляем элемент из компоновки
//		w.layout.remove(item); //FIXME
		// }


//		this.events.fire('item:remove', {'item': item});

		return item;
	},




	each: function(callback, filter, sorter) {

		var c = this.widget; // возможно не лучшее решение, но практичное

		var values = this.src;

		var filter = filter || c.options.filter;
		var sorter = sorter || c.options.sorter;

		if(filter || sorter) {

			var kv_a = [];

			// Filtering source and mapping it to KV-array
			Ergo.each(values, function(v, i) {
				if(!filter || filter(v, i)) {
					kv_a.push( [i, v] );
				}
			});



			if(sorter) {
				// Sorting KV-array
				kv_a.sort( sorter );
			}


			for(var i = 0; i < kv_a.length; i++) {
				var kv = kv_a[i];
				callback.call(c, kv[1], i);//kv[0]);
			}

		}
		else {
			// Basic each
			Ergo.each(this.src, callback);

		}

	},



	remove_all: function() {

		var w = this.widget;

		for(var i = 0; i < this.src.length; i++) {
			var item = this.src[i];

			delete item.parent;
			delete item._index;

			if(item._key) {
				delete w['$'+item._key];
				delete w[item._key];
				delete item._key;
			}

		}

		this.src.length = 0; // possible bugs
	},




	// _destroy_all: function() {
		// while(this.src.length)
			// this.remove_at(0)._destroy();
	// }

//	find: function(i) {
//		return Ergo.core.ItemCollection.superclass.find.call(this, Ergo.utils.widget_filter(i));
//	}

});








/**
 * Коллекция компонентов виджета
 *
 *
 * @class
 * @name Ergo.core.WidgetComponents
 * @extends Ergo.core.Array
 *
 *
 */
Ergo.declare('Ergo.core.WidgetComponents', 'Ergo.core.Array', /** @lends Ergo.core.WidgetComponents.prototype */ {

	defaults: {
//		plugins: [Ergo.Observable]
//		include: 'observable'
	},


	_initialize: function(w, o) {
//		this._super(null, o);

		this.options = o;

		this.src = [];
//		this.events = new Ergo.events.Observer(this);

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
		// if(i in this._widget)
		// 	this.remove_at(i);
		if( ('$'+i) in this._widget)
			this._widget['$'+i]._destroy();
//			this._widget.children.remove_at(i);
		return this._widget.children.add(item, i, this.options.type);
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
//		return this._widget.children.remove_at(i);
		var removed = this._widget.children.remove_if(function(v) {	return v._key == i;	});

		return removed.length == 0 ? null : removed[0];
	},

	/**
	 * Удаление значения
	 *
	 * Для удаления используется метод remove_at
	 *
	 * @param {Object} item значение
	 */
	remove: function(item) {
		return this.remove_at(item._key);
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
		keys.sort(Ergo.sort_numbers).reverse();
		var removed = [];
		for(var i = 0; i < keys.length; i++) removed.push( this.remove_at(keys[i]) );
		return removed;
	},


	remove_all: function() {
		var src = this._source();
		for(i in src)
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
	each: function(callback) {
		return Ergo.each(this._source(), callback);
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
	},


	first: function() {
		return this._source()[0];
	},


	last: function() {
		var src = this._source();
		return src[src.length-1];
	}


});




/**
 * Коллекция элементов виджета
 *
 *
 * @class
 * @name Ergo.core.WidgetItems
 * @extends Ergo.core.WidgetComponents
 *
 *
 */
Ergo.declare('Ergo.core.WidgetItems', 'Ergo.core.WidgetComponents', /** @lends Ergo.core.WidgetItems.prototype */ {

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
	},

	remove_all: function() {
		var src = this._source();
		for(var i = 0; i < src.length; i++)
			this.remove(src[i]);//_at(src[i]._index);
	},



	remove_at: function(i) {
		var removed = this._widget.children.remove_if(function(v) {	return v._index === i;	});

		return removed.length == 0 ? null : removed[0];
	},


	remove: function(item) {
		return this.remove_at(item._index);
	},



/*
	set: function(i, item) {
		this._widget.children.add(item, i, 'item');
	},

	add: function(item, i) {
		this._widget.children.add(item, i, 'item');
	}
*/

});
