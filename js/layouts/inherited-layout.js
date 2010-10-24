

Dino.declare('Dino.layouts.InheritedLayout', Dino.Layout, {
	
	initialize: function(){
		Dino.layouts.InheritedLayout.superclass.initialize.apply(this, arguments);
		
		this.deferred = [];
	},
	
	
	insert: function(item) {
		if(this.container.parent)
			this.container.parent.layout.insert(item);
		else
			this.deferred.push(item);
	},
	
	remove: function(item) {
		this.container.parent.layout.remove(item);
	},
	
	clear: function() {
		//TODO здесь интересный вопрос - в принципе нужно запоминать свои элементы и удалять только их
//		this.container.el.empty();
	},
	
	update: function() {
		while(this.deferred.length > 0) {
			this.insert( this.deferred.pop() );
		}
	}
	
}, 'inherited-layout');