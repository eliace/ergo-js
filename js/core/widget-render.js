


Ergo.WidgetRender = {


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




/*
		this.components.each(function(item){
//			if(!item._dynamic)
				item.render();
		});

		this.items.each(function(item){
			// содержимое динамических элементов отрисовывается через bind
			if(!item.options.dynamic)  //FIXME
				item.render();
		});
*/

/*
		if(cascade !== false) {

			this.children.each(function(item) {
				if(!item.options.dynamic)  //FIXME
					item.render(null, false);
			});

			this.components.each(function(item){
					item.render();
			});

			this.items.each(function(item){
				// содержимое динамических элементов отрисовывается через bind
				if(!item.options.dynamic)  //FIXME
					item.render();
			});

		}
*/

		if(cascade !== false)
			this._layoutChanged();


		return $.when( (this.options.showOnRender || this.options.renderEffects) ? this.show() : true );
	},



	/**
	 * Удаление виджета из DOM-дерева
	 *
	 */
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




	/**
	 * Перерисовка виджета
	 *
	 *
	 *
	 * @protected
	 *
	 */
	_rerender: function(update, diff) {

		var w = this;
		var o = this.options;
		var filter = o.renderFilter ? o.renderFilter.bind(this) : null;
		var sorter = o.renderSorter ? o.renderSorter.bind(this) : null;

		// если .children не проинициализирован, значит перерисовывать нечего
		if(!this.__c) return;


		// обработка `non-empty`
		if( this._rendered ) {
			if( this.options.autoRender !== true && (this.options.autoRender == 'non-empty' && this.children.src.length == 0 && !this.options.text) ) {
				this.unrender();
//				w.layout.remove( this );
			}
		}
		else if( this.parent ) {
			if( this.options.autoRender !== false && !(this.options.autoRender == 'non-empty' && this.children.src.length == 0 && !this.options.text) ) {
				this.render();
//				this._type == 'item' ? this.parent.layout.add(this, this._index /*item._index*/) : this.parent.layout.add(this, undefined, this._weight);
			}
		}


		// убираем из DOM-дерева все элементы
		this.children.each(function(item){
			if(item._rendered)
				item.unrender();
		});




		// добавляем в DOM-дерево элементы
		this.children.each(function(item, i){
			if(!item._rendered && item.options.autoRender !== false && !(item.options.autoRender == 'non-empty' && item.children.src.length == 0 && !item.options.text)) {

				item._type == 'item' ? w.layout.add(item, i /*item._index*/) : w.layout.add(item, undefined, i);

			}

		}, filter, sorter);


		// обновляем компоновку
		if(update !== false)
			this._layoutChanged();

	},





  /**
	 * Обработчик, вызываемый когда необходимо обновить компоновку
	 *
	 * @protected
	 */
	_layoutChanged: function(cascade) {

		if(this.__l || this.options.autoHeight || this.options.autoWidth || this.options.autoFit) {
//			console.log(this.el);
			this.layout.update();
		}
		//FIXME возможно следует поменять эту строку на fire('layoutChanged')
//		if(this.layout.options.updateMode == 'auto') this.layout.update();

		if(cascade !== false && this.__c)
			this.children.apply_all('_layoutChanged');

//		this.events.fire('layoutChanged');
	},







};
