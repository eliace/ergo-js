
Ergo.defineClass('Ergo.layouts.Inherited', {

	extends: 'Ergo.core.Layout',

	// select: function(item) {
		// return this.container.parent.el;
	// }


	_initialize: function() {
		Ergo.layouts.Inherited.superclass._initialize.apply(this, arguments);

		// отключаем отрисовку
		this._widget.options.autoRender = false;
	},



	// add: function(item, index, weight, group) {
	//
	// 	var g = [[this._widget.options.weight, this._widget._index]];
	//
	// 	this._widget.parent.vdom.add(item, index, weight, group ? g.concat(group) : g);
	//
	// },


	addAfter: function(item, otherItem, weight, group) {

		var g = [[this._widget.options.weight, this._widget._index]];  //FIXME this._widget._index некорректный индекс

		this._widget.parent.vdom.addAfter(item, otherItem, weight, group ? g.concat(group) : g);

	},


	addBefore: function(item, otherItem, weight, group) {

		var g = [[this._widget.options.weight, this._widget._index]];  //FIXME this._widget._index некорректный индекс

		this._widget.parent.vdom.addBefore(item, otherItem, weight, group ? g.concat(group) : g);

	}




}, 'layouts:inherited');


Ergo.alias('layouts:contents', Ergo.layouts.Inherited);
