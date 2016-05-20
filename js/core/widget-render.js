


/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetRender = {



	/**
	 * Подключение DOM к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|String} data подключаемые данные
	 */
	_bindDOM: function() {

		var o = this.options;

		if(o.layout) {
			if(typeof o.layout === 'string') {
				var clazz = $ergo.alias(o.layout) || $ergo.alias('layouts:'+o.layout);
				if(!clazz) {
					throw new Error('Unknown layout ['+o.layout+']');
				}
				this.__dom = new (clazz)(o.tag, this, null, o.tagNS);
			}
			else if( o.layout.constructor === Object ) {
				var name = o.layout.etype || 'default';
				this.__dom = new ($ergo.alias('layouts:'+name))(o.tag, this, o.layout, o.tagNS);
//				this.__dom = new Ergo.core.Layout(o.tag, this, o.layout);
			}
			else if( o.layout.constructor === Function ) {
				this.__dom = o.layout.call(this, o.tag, null, o.tagNS);
			}
			else {
				console.error('Can not create dom for layout ['+o.layout+']');
			}
//		 this.__dom = (o.layoutFactory || this.layoutFactory)(layout);
		}
		else {
		 this.__dom = new Ergo.core.Layout(o.tag, this, null, o.tagNS);
		}

//		this.__dom.attach(this);//this.layout.options._widget || this);


		if( o.dynamic ) {
			this.events.on('diff', function(e) {
				// перестраиваем компоновку
				this._rerender(false, {created: e.created, deleted: e.deleted, updated: e.updated});
			}.bind(this));
		}

	},




	/**
	 * Отрисовка виджета
	 *
	 * @example
	 *
	 * w.render();
	 * w.render(true);
	 * w.render('body');
	 * w.render('#some-id');
	 * w.render('.some-class');
	 *
	 * @param {DOMElement|String} target целевой объект отрисовки
	 * @param {true|false} cascade каскадное обновление компоновки
	 * @param {Ergo.core.Widget} beforeItem элемент, после которого будет добавлен виджет
	 *
	 */
	render: function(target, cascade, beforeItem) {

//		console.log('render');

//    var el = this.el;


		// нет дочерних элементов и non-empty не рисуем
		if( (this.options.autoRender === false && target !== true) || (this.options.autoRender == 'non-empty' && !this.__txt && (!this.__c || this.__c.src.length == 0)) ) {
			return;
		}


		// для краткой формы отрисовки
		if(arguments.length == 0 && !this._rendered && this.parent) {
			return this.parent.render(true);
		}


		// есть дочерние элементы и виджет явно не управляетя данными
		if( this.__c) {

			var self = this;
			var o = this.options;
			var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
			var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
			var pager = o.renderPager ? o.renderPager.bind(this) : null;


			// сначала добавляем все неотрисованные элементы в DOM
			var prev = null;
			this.__c.stream(filter, sorter, pager, function(child, i) {

				// // динамические элемены не рисуем
				// if(item._dynamic && item.data) {
				// 	return;
				// }

//				if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {  // options.text?
				if(!child._rendered) {
					child.render(null, false, prev);
				}

				if(child._rendered) {
					prev = child;
				}


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

	    });

			// this.__c.src.forEach(function(item) {
			// });
		}
		// нет дочерних элементов
		else {

		}



		if( this.parent && (target == null || target === true) ) {//} && (target == null || (this.options.autoRender == 'non-empty' && (!this.__c || !this.__c.src.length == 0 || this.options.text))) ) {

			if(!this._rendered && this.options.autoRender !== false && this.options.autoRender !== 'ignore') {
				// if( this.parent.__c.src.length == 1 && this._type != 'item' ) {
				// 	this.dom.el._weight = this._weight;
				// 	this.parent.dom.el.appendChild(this.dom.el);
				// 	this._rendered = true;
				// }
				// else {

				if(beforeItem && beforeItem.options.weight == this.options.weight) {
					this.parent.dom.addAfter(this, beforeItem, this.options.weight);
				}
				else {
					this.parent.dom.addAfter(this, undefined, this.options.weight);
				}

				// if(forcedIndex != null) {
				// 	this._type == 'item' ? this.parent.dom.add(this, forcedIndex) : this.parent.dom.add(this);
				// }
				// else {
				// 	this._type == 'item' ? this.parent.dom.add(this, this._index) : this.parent.dom.add(this);
				// }

//				}
			}

		}
		else if(target === true) {
			this._rendered = true;
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
				target.appendChild(this.dom.outerEl);
				this._rendered = true;
			}
		}


		// обновляем компоновку
//		if(cascade !== false) {
			this._layoutChanged(cascade);
//		}


		if( this.options.showOnRender || this.options.renderEffects ) {
			this.show();
		}


  },




	/**
	 * Удаление виджета из DOM/компоновки
	 *
	 */
	unrender: function() {

		this._rendered = false;

		var callback = function() {
			if(this.parent) {
				this.parent.dom.remove(this);
			}
			else {
				this.__dom.detach();
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
			if( this.options.autoRender !== true && (this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.__txt) ) {
				this.unrender();
//				w.layout.remove( this );
			}
		}
		else if( this.parent ) {
			if( this.options.autoRender !== false && !(this.options.autoRender == 'non-empty' && this.__c.src.length == 0 && !this.__txt) ) {
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
			var pager = o.renderPager ? o.renderPager.bind(this) : null;

			// Полная перерисовка

//			console.log('full rerender');

			// убираем из DOM-дерева все элементы
			this.__c.each(function(child){
				if(child._rendered)
					child.unrender();
			});


			// добавляем в DOM-дерево элементы
			var prev = undefined;
			this.__c.stream(filter, sorter, pager, function(child, i) {

				if(!child._rendered && child.options.autoRender !== false) {
					child.render(null, false, prev);
//					this.dom.addAfter(child, prev, child.options.weight);
//					child._type == 'item' ? this.dom.add(child, i) : this.dom.add(child);
//					item.render();
				}

				if(child._rendered) {
					prev = child;
				}

				// if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.__c.src.length == 0 && !item.options.text)) {
				//
				// 	item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);
				//
				// }
			});

		}


		// обновляем компоновку
//		if(cascade !== false) {
			this._layoutChanged(cascade);
//		}

	},





  /**
	 * Обработчик обновления компоновки (dom)
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

//		if(this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
		this.dom.update();

		if(this.options.rendering) {
			this.options.rendering.call(this);
		}
//		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c && !(this.data && this.options.dynamic)) {
			this.__c.applyAll('_layoutChanged');
		}

//		this.events.fire('layoutChanged');
	},




	/**
	 * Обработчик обновления компоновки на основе diff
	 *
	 * @protected
	 */
	_renderDiff: function(created, deleted, updated) {

//		console.log('render diff', arguments);

		var o = this.options;

		var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
		var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;
		var pager = o.renderPager ? o.renderPager.bind(this) : null;

		var self = this;

		var dom = this.dom;




		if(created) {
			for(var i = 0; i < created.length; i++) {
				var item = created[i];
				var index = item._index;

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр, то не будем его добавлять в dom
						continue;
					}

				}


				item.render();  //FIXME куда рендерим?

//				console.log('create', item.text, item._index, item.dom.outerEl._pos);

			}
		}




		var kv_a = [];
//		var prev = undefined;
		this.items.each(function(item, i) {
			// добавляем только отфильтрованные отрисованные элементы
			if(item._rendered && (!filter || filter(item, item._index))) {
				kv_a.push( [item._index, item, item.dom.el._pos, item.dom] );
//				prev = item;
			}
		});


		if(sorter) {
			// Sorting KV-array
			kv_a.sort(sorter);
		}


		// console.log('disorder', kv_a);
		// var texts = [];
		// for(var i = 0; i < this.dom.innerEl.childNodes.length; i++) {
		// 	texts.push(this.dom.innerEl.childNodes[i].textContent);
		// }
		// console.log('text', texts);


		$ergo.fixDisorder(kv_a, function(i, j, kv_i, kv_j) {

			var item_i = this.dom.at(i)._dom._widget;
			var item_j = this.dom.at(j)._dom._widget;

//			var _item = this.items.get(i);

//			console.log('move', i, j, item_i, item_j);//kv_i[1].text, kv_j[1].text, i, j, kv_i[1].dom.outerEl._pos, kv_j[1].dom.outerEl._pos);

			//TODO нужно оптимизировать с помощью функции items.move()
			dom.remove(item_i);
//			dom.add(_item, j);
			if(i < j) {
				dom.addAfter(item_i, item_j, item_i.options.weight);
			}
			else {
				dom.addBefore(item_i, item_j, item_i.options.weight);
			}

		}.bind(this));





/*
		if(deleted) {

		}



		if(created) {
			for(var i = 0; i < created.length; i++) {
				var item = created[i];
				var index = item._index;

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр, то не будем его добавлять в dom
						continue;
					}

				}

				// // при наличии сортировки индекс виджета не важен
				// if(sorter) {
				// 	index = null;
				// }

//				dom.render(item);
				item.render();  //FIXME куда рендерим?

			}
		}


		if(updated) {

			for(var i = 0; i < updated.length; i++) {
				var item = updated[i];

				if(filter) {
					if( !filter(item, item._index) ) {
						// если элемент не прошел фильтр и отрисован, то убираем его из VDOM
						if(item._rendered) {
							dom.remove(item);
						}
						continue;
					}
				}


				// если элемент не отрисован рисуем его в позицию item._index
				if(!item._rendered) {
					dom.add(item, item._index);
				}
				// если есть sorter, то обновлять отрисованный элемент нет смысла
				else if(!sorter){
					// MOVE
					dom.remove(item);
					dom.add(item, item._index);
				}

			}

		}



		if(sorter) {

			var kv_a = [];
			this.items.each(function(item, i) {
				// добавляем только отрисованные элементы
				if(item._rendered) {
					kv_a.push( [item._index, item, item.dom.el._pos, item.dom] );
				}
			});


			// Sorting KV-array
			kv_a.sort(sorter);


			$ergo.fixDisorder(kv_a, function(i, j) {

				var _item = this.items.get(i);

				//TODO нужно оптимизировать с помощью функции items.move()
				dom.remove(_item);
				dom.add(_item, j);

			}.bind(this));


		}
*/

	}







};
