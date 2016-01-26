


Ergo.WidgetRender = {



	_bindVDOM: function() {

		var o = this.options;

		if(o.layout) {
			if(typeof o.layout === 'string') {
				var clazz = $ergo.alias('layouts:'+o.layout);
				if(!clazz) {
					throw new Error('Unknown layout ['+o.layout+']');
				}
				this.__vdom = new (clazz)(o.tag, this);
			}
			else if( o.layout.constructor === Object ) {
				var name = o.layout.etype || 'default';
				this.__vdom = new ($ergo.alias('layouts:'+name))(o.tag, this, o.layout);
//				this.__vdom = new Ergo.core.Layout(o.tag, this, o.layout);
			}
			else if( o.layout.constructor === Function ) {
				this.__vdom = o.layout.call(this, o.tag);
			}
			else {
				console.error('Can not create vdom for layout ['+o.layout+']');
			}
//		 this.__vdom = (o.layoutFactory || this.layoutFactory)(layout);
		}
		else {
		 this.__vdom = new Ergo.core.Layout(o.tag, this);
		}

//		this.__vdom.attach(this);//this.layout.options._widget || this);


		if( o.dynamic ) {
			this.events.on('diff', function(e) {
				// перестраиваем компоновку
				this._rerender(false, {created: e.created, deleted: e.deleted, updated: e.updated});
			}.bind(this));
		}


		this._bindEvents('vdom');
	},





	render: function(target, cascade, forcedIndex) {

//		console.log('render');

//    var el = this.el;

		// нет дочерних элементов и non-empty не рисуем
		if( this.options.autoRender == 'non-empty' && !this.options.text && (!this.__c || this.__c.src.length == 0) ) {
			return;
		}


		// есть дочерние элементы и виджет явно не управляетя данными
		if( this.__c) {

			var self = this;
			var o = this.options;
			var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
			var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;


			// сначала добавляем все неотрисованные элементы в DOM
			this.__c.each(function(child) {

				// // динамические элемены не рисуем
				// if(item._dynamic && item.data) {
				// 	return;
				// }

//				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {  // options.text?
				if(!child._rendered)
					child.render(null, false);
					// if( self.__c.src.length == 1 && item._type != 'item' ) {
					// 	item.el._weight = item._weight;
			    //   self.el.appendChild(item.el);
					// 	item._rendered = true;
					// }
					// else {
					// 	item._type == 'item' ? self.layout.add(item, item._index) : self.layout.add(item);
					// }
//				}

//				item.render(false);

	    },  filter, sorter);

			// this.__c.src.forEach(function(item) {
			// });
		}
		// нет дочерних элементов
		else {

		}



		if( this.parent && target == null ) {//} && (target == null || (this.options.autoRender == 'non-empty' && (!this.__c || !this.__c.src.length == 0 || this.options.text))) ) {

			if(!this._rendered && this.options.autoRender !== false) {
				// if( this.parent.__c.src.length == 1 && this._type != 'item' ) {
				// 	this.dom.el._weight = this._weight;
				// 	this.parent.dom.el.appendChild(this.dom.el);
				// 	this._rendered = true;
				// }
				// else {
				if(forcedIndex != null) {
					this._type == 'item' ? this.parent.vdom.add(this, forcedIndex) : this.parent.vdom.add(this);
				}
				else {
					this._type == 'item' ? this.parent.vdom.add(this, this._index) : this.parent.vdom.add(this);
				}
//				}
			}

		}
		else if(target) {
			if( target.constructor === String ) {
				if(target[0] == '#') {
					target = document.getElementById(target.substr(1));
				}
				else if(target[0] == '.') {
					target = document.getElementsByClassName(target.substr(1))[0];
				}
				else {
					target = document.getElementsByTagName(target)[0];
				}
			}
			if(target) {
				target.appendChild(this.vdom.outerEl);
				this._rendered = true;
			}
		}


		// обновляем компоновку
		if(cascade !== false) {
			this._layoutChanged();
		}


		if( this.options.showOnRender || this.options.renderEffects ) {
			this.show();
		}


  },





	unrender: function() {

		this._rendered = false;

		var callback = function() {
			if(this.parent) {
				this.parent.vdom.remove(this);
			}
			else {
				this.__vdom.detach();
			}
		};


		if( this.options.hideOnUnrender || this.options.renderEffects ) {
			this.hide().then(callback.bind(this));
		}
		else {
			callback.call(this);
		}

//		return $.when( /*(this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() :*/ true )
//			.then(function() {
//			}.bind(this));
	},




  /**
	 * Отрисовка (рендеринг) виджета, т.е. добавление его в DOM-дерево
	 *
	 * Если метод вызывается без параметров, а виджет входит в виртуальное дерево
	 * виджетов, то он будет добавлен в компоновку родителя
	 *
	 * Отрисовка выполняется для всех дочерних виджетов
	 *
	 * После отрисовки вызывается обработчик _layoutChanged
	 *
	 */


/*
	render: function(target, cascade) {


		var self = this;


		if(target === true)
			this.options.autoRender = true; //?


		// только если проиниализирован .children
		if( this.__c ) {

			for(var i = 0; i < this.children.src.length; i++) {

				var item = this.children.src[i];

//			this.children.each(function(item){
				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

					if(this.children.src.length == 1 && item._type != 'item') {
							// если элемент один, то компоновка ему еще не нужна
						// if(item._type == 'item') {
						// 	item.el[0]._index = item._index;
						// 	self.el.append(item.el);
						// }
						// else {
							item.el[0]._weight = item._weight;
							self.el.append(item.el);
//						}

						item._rendered = true;
					}
					else {
						item._type == 'item' ? self.layout.add(item, item._index) : self.layout.add(item);
					}

				}

//			});
			}
			// this.children.each(function(item){
				// item._layoutChanged();
			// });


			for(var i = 0; i < this.children.src.length; i++) {
				var item = this.children.src[i];
//			this.children.each(function(item){
				if( !(item.options.dynamic && item.data) )  //FIXME
					item.render(false, false);
//			});
			}

		}


		if( (target !== false || (this.options.autoRender == 'non-empty' && (!this.__c || !this.children.src.length == 0 || this.options.text))) && this.parent) {

			if(!this._rendered && this.options.autoRender !== false) {

//				console.log(this);

				if(this.parent.children.src.length == 1 && this._type != 'item') {
						// если элемент один, то компоновка ему еще не нужна
					// if(this._type == 'item') {
					// 	this.el[0]._index = this._index;
					// 	this.parent.el.append(this.el);
					// }
					// else {
						this.el[0]._weight = this._weight;
						this.parent.el.append(this.el);
//					}

					this._rendered = true;
				}
				else {
					this._type == 'item' ? this.parent.layout.add(this, this._index) : this.parent.layout.add(this);
				}



//				if(this.options.showOnRender) this.show();
//				if(this.options.hideOnRender) this.hide();
			}

		}
		else if(target) {
			$(target).append(this.el);
			this._rendered = true;
//			target.layout.add(this, this._index);
		}





		if(cascade !== false)
			this._layoutChanged();


		return $.when( (this.options.showOnRender || this.options.renderEffects) ? this.show() : true );
	},
*/


	/**
	 * Удаление виджета из DOM-дерева
	 *
	 */


/*
	unrender: function() {

		this._rendered = false;

		return $.when( (this.options.hideOnUnrender || this.options.renderEffects) ? this.hide() : true )
			.then(function() {
				if(this.parent && this.parent.__l) {
					this.parent.layout.remove(this);
				}
				else {
					this.el.detach();
				}
			}.bind(this));

	},
*/



	/**
	 * Перерисовка виджета
	 *
	 *
	 *
	 * @protected
	 *
	 */
	_rerender: function(cascade, diff) {

		var w = this;
		var o = this.options;

		// если .children не проинициализирован, значит перерисовывать нечего
		if(!this.__c) return;



		// обработка `non-empty`
		if( this._rendered ) {
			if( this.options.autoRender !== true && (this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.options.text) ) {
				this.unrender();
//				w.layout.remove( this );
			}
		}
		else if( this.parent ) {
			if( this.options.autoRender !== false && !(this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.options.text) ) {
				this.render();
//				this._type == 'item' ? this.parent.layout.add(this, this._index /*item._index*/) : this.parent.layout.add(this, undefined, this._weight);
			}
		}


		if(diff) {

			// Частичная перерисовка

			this._renderDiff(diff.created, diff.deleted, diff.updated);


		}
		else {

			var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
			var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;

			// Полная перерисовка

//			console.log('full rerender');

			// убираем из DOM-дерева все элементы
			this.__c.each(function(child){
				if(child._rendered)
					child.unrender();
			});


			// добавляем в DOM-дерево элементы
			this.__c.each(function(child, i){
				if(!child._rendered && child.options.autoRender !== false) {
					child._type == 'item' ? this.vdom.add(child, i) : this.vdom.add(child);
//					item.render();
				}

				// if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.__c.src.length == 0 && !item.options.text)) {
				//
				// 	item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);
				//
				// }
			}, filter, sorter);

		}


		// обновляем компоновку
		if(cascade !== false)
			this._layoutChanged();

	},





  /**
	 * Обработчик, вызываемый когда необходимо обновить компоновку
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

//		if(this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
		this.vdom.update();

		if(this.options.rendering) {
			this.options.rendering.call(this);
		}
//		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c && !(this.data && this.options.dynamic)) {
			this.__c.apply_all('_layoutChanged', cascade);
		}

//		this.events.fire('layoutChanged');
	},





	_renderDiff: function(created, deleted, updated) {

//		console.log('render diff', arguments);

		var o = this.options;

		var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
		var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
		var pager = o.renderPager ? o.renderPager.bind(this) : null;

		var self = this;

		var vdom = this.vdom;



		if(deleted) {

		}


		if(created) {
			for(var i = 0; i < created.length; i++) {
				var item = created[i];
				var index = item._index;

				if(!filter || filter(item)) {

					// при наличии сортировки индекс виджета не важен
					if(sorter) {
						index = null;
					}

					vdom.add(item, item._index);
				}

			}
		}


		if(updated) {

			for(var i = 0; i < updated.length; i++) {
				var item = updated[i];

				// если элемент не отрисован рисуем его в позицию item._index
				if(!item._rendered) {
					vdom.add(item, item._index);
				}
				// если есть sorter, то обновлять отрисованный элемент нет смысла
				else if(!sorter){
					vdom.remove(item);
					vdom.add(item, item._index);
				}

			}

		}



		if(sorter) {

			var kv_a = [];
			this.items.each(function(item, i) {
				kv_a.push( [item._index, item, item.dom.el._pos, item.dom] );
			});


			// Sorting KV-array
			kv_a.sort(sorter);


			$ergo.fixDisorder(kv_a, function(i, j) {

				var _item = this.items.get(i);

				//TODO нужно оптимизировать с помощью функции items.move()
				vdom.remove(_item);
				vdom.add(_item, j);

			}.bind(this));


		}


	}







};
