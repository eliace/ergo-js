
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
Ergo.core.WidgetList = Ergo.declare('Ergo.core.WidgetList', 'Ergo.core.Array', /** @lends Ergo.core.Array.prototype */{
	
	defaults: {
		extensions: [Ergo.Observable]
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

		// определяем поле _parent
		item._parent = w;
		
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
		if(('show' in item) && item.options.showOnRender) item.show();
		if(('hide' in item) && item.options.hideOnRender) item.hide();
		
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
		
		// поля _parent, _index и _key больше не нужны
		delete item._parent;
		delete item._name;

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
