

//= require "collection"

/**
 * Коллекция виджетов
 * 
 * При добавлении элемента происходят следующие действия:
 *   1. Вызов метода-фабрики компонентов
 *   2. Связывание элемента с данными родительского виджета
 *   3. Добавление элемента в компоновку
 * 
 * @class
 * @extends Ergo.core.Collection
 * 
 */
Ergo.core.WidgetCollection = Ergo.declare('Ergo.core.WidgetCollection', 'Ergo.core.Collection', /** @lends Ergo.core.Collection.prototype */{
	
	defaults: {
		extensions: [Ergo.Observable]
	},
	
	
	initialize: function(w, o) {
		this.$super(null, o);
//		Ergo.core.WidgetCollection.superclass.initialize.call(this, null, o);
		
		this._widget = w;
	},
	

	add: function(item, i) {
		
		var w = this._widget;
		
		this.remove_at(i);
		
//		item = w.factory(item);

		if(!(item instanceof Ergo.core.Widget))
			item = w.options.componentFactory.call(w, item);

		
		this.src[i] = item;
		
		item.parent = this._widget;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.bind(w.data, false, 2);
		
		w.children.add(item);		
		w.layout.insert(item);
		
		// shortcut для компонента
		w[i] = item;
		
		if(('show' in item) && item.options.showOnRender) item.show();
		
//		this.events.fire('item:add', {'item': item});

		return item;
	},
	
	remove_at: function(i) {
		
		if(!(i in this.src)) return undefined;
		
		var w = this._widget;		
		var item = this.src[i];
		
//		if('hide' in item) item.hide();

		w.children.remove(item);
		w.layout.remove(item);
		
		delete this.src[i];
		delete item.parent;
		
		
		return item;
	},
	

	destroy_all: function() {
		for(i in this.src)
			this.remove_at(i).destroy();
	}
	
//	find: function(i) {
//		return Ergo.core.ComponentCollection.superclass.find.call(this, Ergo.utils.widget_filter(i));
//	},
	
	
	
//	factory: function(o) {
//		return Ergo.widget( Ergo.smart_override({}, this._widget.options.defaultComponent, o) );			
//	}
	
		
});
