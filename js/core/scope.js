

/**
* Скоуп
*
*	Структурный элемент страницы, включающий набор виджетов
*
*
*/

Ergo.defineClass('Ergo.core.Scope', 'Ergo.core.Object', {

	defaults: {
		include: 'observable'
	},


	_initialize: function(widget, o) {
		Ergo.core.Scope.superclass._initialize.call(this, o);

		this.widgets = {};

		this._children = {};
//		this.data = {};
		this._widget = widget;

	},


// 	_construct: function(o) {
// 		this._super(o);
//
//
// //		this.context = null;
// 	},



	addWidget: function(key, widget) {

		//
		if(widget.constructor === Object) {
			widget = $.ergo(widget);
		}

		this.widgets[key] = widget;
		widget.scope = this;

		return widget;
	},



	widget: function(k, w) {

		if(arguments.length == 1) {
			return this.widgets[k];
		}
		else {
			return this.addWidget(k, w);
		}

	},


	// removeWidget: function(key) {
	//
	// 	var w = this.widgets[key];
	//
	// 	//
	//
	// 	delete w.scope;
	// 	delete this.widgets[key];
	//
	// 	w._destroy();
	//
	// },



	createWidgets: function() {

		// рендерим виджеты скоупа (включаем виджеты в скоуп)
		for(var i in this.widgets) {

			var w = this.widgets[i];

			// ищем контейнер, куда можно присоединиться
			var container = null//this._widget;
			for(var scope = this._parent; scope && !container; scope = scope._parent) {
				container = scope._widget;
			}

			var container = container || this._context._widget;

			// если виджет не встроен и не отрисован
			if(!w.parent && !w._rendered) {
				// если у родителя определен контейнер, используем его
				container.components.set(i, w);
//				w.render();
			}

			container.render();
		}

	},



	destroyWidgets: function() {

		Object.keys(this.widgets).forEach(function(key) {

			var w = this.widgets[key];

			w._destroy();

			// w.unrender();
			//
			// w.parent.components.remove(key);

		}.bind(this));

	},




/*
	// получение/создание виджета из пространства контекста
	widget: function(key, w) {

		if(arguments.length == 1) {
			return this.widgets[key];
		}
		else if(arguments.length == 2) {

			if($.isPlainObject(w)) {
				w = $.ergo(w, null, this);
//				w.bind();
			}

			this.widgets[key] = w;
			w.scope = this;
			this['$'+key] = w;

			return w;
		}

	},
*/

	disjoin: function() {

		//TODO здесь нужно удалить все виджеты скоупа

		this._context.disjoin(this._name);
	},



	get params() {
		return this._params;
	}



});
