
//= require "array"



Dino.declare('Dino.core.ItemCollection', 'Dino.core.Array', {
	
	defaults: {
		extensions: [Dino.Observable]
//		factory: function(o) {
//			return Dino.widget( Dino.smart_override({}, this.options.defaultItem, o) );			
//		}
	},
	
	
	initialize: function(w, o) {
		Dino.core.ItemCollection.superclass.initialize.call(this, null, o);
		
		this.widget = w;
	},
	
	get: function(i) {
		return this.src[i];
	},
	
	add: function(item, i) {
		
		var w = this.widget;
		
		if(!(item instanceof Dino.core.Widget)) {
			item = w.options.itemFactory.call(w, item);
		}
		
		item.parent = this.widget;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.$bind(w.data, false, 2);
		
		//FIXME здесь может возникать ошибка, когда children не совпадает с items
		w.children.add(item, i);
		w.layout.insert(item, this.src[i]);

		i = Dino.core.ItemCollection.superclass.add.call(this, item, i);		
		
		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		if(('show' in item) && item.options.showOnRender) item.show();
		
		return item;
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		var item = Dino.core.ItemCollection.superclass.remove_at.call(this, i);
		
		var w = this.widget;		
		
//		if('hide' in item) item.hide();		
				
		w.children.remove(item);		
		w.layout.remove(item);
		
		delete item.parent;

		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		return item;
	},
	
	remove_all: function() {
		while(this.src.length)
			this.remove_at(0);
	},

	destroy_all: function() {
		while(this.src.length)
			this.remove_at(0).destroy();
	}
	
//	find: function(i) {
//		return Dino.core.ItemCollection.superclass.find.call(this, Dino.utils.widget_filter(i));
//	}	
		
});
