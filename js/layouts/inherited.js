//= require <core/layout>

Ergo.declare('Ergo.layouts.Inherited', 'Ergo.core.Layout', {
	
	// select: function(item) {
		// return this.container.parent.el;
	// }
	
	add: function(item, index, weight) {
		
//		var _select = this.container.parent.layout.options.selector;
		
//		var wrapper = this.container._wrapper;
		
//		if(wrapper) {
//			this._widget.el.after(item.el);
		this._widget.parent.layout.add(item, index, weight);
//		}
		
		
//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector = function() { return wrapper; }
		
//		this.container.parent.layout.add(item, index, weight);
		
//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector= _select;
		
	}
	
	
}, 'layouts:inherited');
