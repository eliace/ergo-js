
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
	

	add: function(item, i) {		
		
		var key;
		var w = this.widget;
		
//		item = w.factory(item);

		if(!(item instanceof Ergo.core.Widget))
			item = w.options.itemFactory.call(w, item);

		if(i && $.isString(i)) {
			key = i;
			i = undefined;
//			i = item.options.weight;
		}

		
		item.parent = w;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.bind(w.data, false, false);
		
		// добавляем элемент в компоновку
		w.layout.insert(item, this.src[i]);

		i = this.$super(item, i);// Ergo.core.WidgetArray.superclass.add.call(this, item, i);		
		
		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		//FIXME скорее всего вызов метода show должен находиться не здесь
		if(('show' in item) && item.options.showOnRender) item.show();
		
		
		if(key) {
			w[key] = item;
//			item.opt('tag', key);
			item._name = key;
		}
		
		return item;
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		
		var key;
		var w = this.widget;		
		
		if($.isString(i)) {
			key = i;
			i = w[i].index;
		}
		
		
		var item = this.$super(i); //Ergo.core.WidgetArray.superclass.remove_at.call(this, i);
		
		
//		if('hide' in item) item.hide();		
				
//		w.children.remove(item);		
		w.layout.remove(item);
		
		delete item.parent;

		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		if(key) {
			delete w[key];
			delete item._name;
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
