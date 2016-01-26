
Ergo.declare('Ergo.layouts.Inherited', 'Ergo.core.Layout', {

	// select: function(item) {
		// return this.container.parent.el;
	// }


	_initialize: function() {
		Ergo.layouts.Inherited.superclass._initialize.apply(this, arguments);

		// отключаем отрисовку
		this._widget.options.autoRender = false;
	},



	add: function(item, index, weight, group) {

//		var _select = this.container.parent.layout.options.selector;

//		var wrapper = this.container._wrapper;

		var g = [[this._widget.options.weight, this._widget._index]];

//		if(wrapper) {
//			this._widget.el.after(item.el);
		this._widget.parent.vdom.add(item, index, weight, group ? g.concat(group) : g);
//		}


//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector = function() { return wrapper; }

//		this.container.parent.layout.add(item, index, weight);

//		if(this.container._wrapper)
//			this.container.parent.layout.options.selector= _select;

	}


}, 'layouts:inherited');
