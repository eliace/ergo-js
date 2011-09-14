
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
Ergo.core.WidgetArray = Ergo.declare('Ergo.core.WidgetArray', 'Ergo.core.Array', /** @lends Ergo.core.Array.prototype */{
	
	defaults: {
		extensions: [Ergo.Observable]
//		factory: function(o) {
//			return Ergo.widget( Ergo.smart_override({}, this.options.defaultItem, o) );			
//		}
	},
	
	
	initialize: function(w, o) {
		this.$super(null, o);
//		Ergo.core.WidgetArray.superclass.initialize.call(this, null, o);
		
		this.widget = w;
	},
	

	add: function(item, i) {
		
		var w = this.widget;
		
//		item = w.factory(item);

		if(!(item instanceof Ergo.core.Widget))
			item = w.options.itemFactory.call(w, item);

		
		item.parent = w;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.bind(w.data, false, 2);
		
		//FIXME здесь может возникать ошибка, когда children не совпадает с items
		w.children.add(item, i);
		w.layout.insert(item, this.src[i]);

		i = this.$super(item, i);// Ergo.core.WidgetArray.superclass.add.call(this, item, i);		
		
		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		//FIXME скорее всего вызов метода show должен находиться не здесь
		if(('show' in item) && item.options.showOnRender) item.show();
		
		return item;
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		var item = this.$super(i); //Ergo.core.WidgetArray.superclass.remove_at.call(this, i);
		
		var w = this.widget;		
		
//		if('hide' in item) item.hide();		
				
		w.children.remove(item);		
		w.layout.remove(item);
		
		delete item.parent;

		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		return item;
	},
	
	destroy_all: function() {
		while(this.src.length)
			this.remove_at(0).destroy();
	}
	
//	find: function(i) {
//		return Ergo.core.ItemCollection.superclass.find.call(this, Ergo.utils.widget_filter(i));
//	}	
		
});
