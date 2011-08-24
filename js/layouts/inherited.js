
//= require "plain"


/**
 * @class
 * @extends Ergo.layouts.PlainLayout
 */
Ergo.layouts.InheritedLayout = Ergo.declare('Ergo.layouts.InheritedLayout', 'Ergo.layouts.PlainLayout', /** @lends Ergo.layouts.InheritedLayout.prototype */{
	
//	initialize: function(){
//		Ergo.layouts.InheritedLayout.superclass.initialize.apply(this, arguments);
//		
//		this.deferred = [];
//	},
	
	
	attach: function() {
		Ergo.layouts.InheritedLayout.superclass.attach.apply(this, arguments);
		
		this.el = this.options.parentLayout.el;
		
	}
	
	
//	insert: function(item) {
//		Ergo.layouts.InheritedLayout.superclass.insert.apply(this, arguments);
//		this.container.insert(item);
////		else
////			this.deferred.push(item);
//	},
//	
//	remove: function(item) {
//		Ergo.layouts.InheritedLayout.superclass.remove.apply(this, arguments);
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