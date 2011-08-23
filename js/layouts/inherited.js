
//= require "plain"


/**
 * @class
 * @extends Ergo.core.Layouts.PlainLayout
 */
Ergo.core.Layouts.InheritedLayout = Ergo.declare('Ergo.core.Layouts.InheritedLayout', 'Ergo.core.Layouts.PlainLayout', /** @lends Ergo.core.Layouts.InheritedLayout.prototype */{
	
//	initialize: function(){
//		Ergo.core.Layouts.InheritedLayout.superclass.initialize.apply(this, arguments);
//		
//		this.deferred = [];
//	},
	
	
	attach: function() {
		Ergo.core.Layouts.InheritedLayout.superclass.attach.apply(this, arguments);
		
		this.el = this.options.parentLayout.el;
		
	}
	
	
//	insert: function(item) {
//		Ergo.core.Layouts.InheritedLayout.superclass.insert.apply(this, arguments);
//		this.container.insert(item);
////		else
////			this.deferred.push(item);
//	},
//	
//	remove: function(item) {
//		Ergo.core.Layouts.InheritedLayout.superclass.remove.apply(this, arguments);
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