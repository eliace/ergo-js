
//= require "plain"


/**
 * @class
 * @extends Dino.core.Layouts.PlainLayout
 */
Dino.core.Layouts.InheritedLayout = Dino.declare('Dino.core.Layouts.InheritedLayout', 'Dino.core.Layouts.PlainLayout', /** @lends Dino.core.Layouts.InheritedLayout.prototype */{
	
//	initialize: function(){
//		Dino.core.Layouts.InheritedLayout.superclass.initialize.apply(this, arguments);
//		
//		this.deferred = [];
//	},
	
	
	attach: function() {
		Dino.core.Layouts.InheritedLayout.superclass.attach.apply(this, arguments);
		
		this.el = this.options.parentLayout.el;
		
	}
	
	
//	insert: function(item) {
//		Dino.core.Layouts.InheritedLayout.superclass.insert.apply(this, arguments);
//		this.container.insert(item);
////		else
////			this.deferred.push(item);
//	},
//	
//	remove: function(item) {
//		Dino.core.Layouts.InheritedLayout.superclass.remove.apply(this, arguments);
//		this.container.remove(item);
//	}
	
//	clear: function() {
//		//TODO здесь интересный вопрос - в принципе нужно запоминать свои элементы и удалять только их
////		this.container.el.empty();
//		this.container.clear();
//	}
	
//	update: function() {
//		while(this.deferred.length > 0) {
//			this.insert( this.deferred.pop() );
//		}
//	}
		
}, 'inherited-layout');