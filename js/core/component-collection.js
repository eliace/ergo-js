


Dino.declare('Dino.core.ComponentCollection', 'Dino.core.Collection', {
	
	defaults: {
		extensions: [Dino.Observable],
		factory: function(o) {
			return Dino.widget(o);			
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
		
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		
		if(!(i in this.src)) return undefined;
		
		var w = this.widget;		
		var item = this.src[i];
		
		w.layout.remove(item);
		delete this.src[i];
		delete item.parent;
		
		return item;
	},
	
	remove_all: function() {
		this.src = {}; //TODO
	},

	destroy_all: function() {
		this.src = {}; //TODO
	}
		
});
