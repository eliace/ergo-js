

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


	_construct: function(o) {
		this._super(o);

		this.widgets = {};

		this._children = {};
//		this.data = {};

//		this.context = null;
	},




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

			return w;
		}

	},


	disjoin: function() {

		//TODO здесь нужно удалить все виджеты скоупа

		this._context.disjoin(this._name);
	},



	get params() {
		return this._params;
	}



});
