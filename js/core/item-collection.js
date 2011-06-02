




Dino.declare('Dino.core.ItemCollection', 'Dino.core.Array', {
	
	defaults: {
		extensions: [Dino.Observable],
		factory: function(o) {
			return Dino.widget( Dino.smart_override({}, this.options.defaultItem, o) );			
		}
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
			item = this.options.factory.call(w, item);
		}
		
		item.parent = this.widget;
		
		// выполняем автобиндинг
		if(w.data && !item.data)
			item.$bind(w.data, false, 2);
		
		w.layout.insert(item);

		i = Dino.core.ItemCollection.superclass.add.call(this, item, i);		
		
		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
//		this.events.fire('item:add', {'item': item});
	},
	
	remove_at: function(i) {
		
		var w = this.widget;		
		var item = this.src[i];
		
		Dino.core.ItemCollection.superclass.remove_at.call(this, i);
				
		w.layout.remove(item);
		delete item.parent;

		for(var j = i; j < this.src.length; j++)
			this.src[j].index = j;
		
		return item;
	},
	
	remove_all: function() {
		this.src = {}; //TODO
	},

	destroy_all: function() {
		this.src = {}; //TODO
	},
	
	find: function(i) {
		return Dino.core.ItemCollection.superclass.find.call(this, Dino.utils.widget_filter(i));
	}	
		
});
