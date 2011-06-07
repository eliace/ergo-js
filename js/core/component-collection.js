


Dino.declare('Dino.core.ComponentCollection', 'Dino.core.Collection', {
	
	defaults: {
		extensions: [Dino.Observable],
		factory: function(o) {
			return Dino.widget( Dino.smart_override({}, this.options.defaultComponent, o) );			
		}
	},
	
	
	initialize: function(w, o) {
		Dino.core.ComponentCollection.superclass.initialize.call(this, null, o);
		
		this.widget = w;
	},
	
	get: function(i) {
		return this.src[i];
	},
	
	add: function(item, i) {
		
		var w = this.widget;
		
		this.remove_at(i);
		
		if(!(item instanceof Dino.core.Widget)) {
			item = this.options.factory.call(w, item);
		}
		
		this.src[i] = item;
		
		item.parent = this.widget;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.$bind(w.data, false, 2);
		
		w.layout.insert(item);
		
		// shortcut для компонента
		w[i] = item;
		
		if('show' in item) item.show();
		
//		this.events.fire('item:add', {'item': item});

		return item;
	},
	
	remove_at: function(i) {
		
		if(!(i in this.src)) return undefined;
		
		var w = this.widget;		
		var item = this.src[i];
		
//		if('hide' in item) item.hide();
		
		w.layout.remove(item);
		delete this.src[i];
		delete item.parent;
		
		return item;
	},
	
	remove_all: function() {
		for(i in this.src)
			this.remove_at(i);
	},

	destroy_all: function() {
		for(i in this.src)
			this.remove_at(i).destroy();
	},
	
	find: function(i) {
		return Dino.core.ComponentCollection.superclass.find.call(this, Dino.utils.widget_filter(i));
	}
		
});
