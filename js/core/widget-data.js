


/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetData = {


  /**
	 * Подключение данных к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|String} data подключаемые данные
	 */
	bind: function(data, update, pivot) {

		var o = this.options;
		var self = this;
		var w = this;

		var data_id = o.dataId;

		// if(data_id != null && data_id[0] == '@') {
		// 	data = this._context.data( data_id.substr(1) );//[data_id];//[data_id.substr(1)];
		// 	data_id = undefined;
		// }

		// если данные не определены или биндинг выключен, то биндинг не выполняем
		if(this.data == data || data === undefined || o.autoBind === false) return;

		// открепляем источник данных от виджета:
		//   удаляем все обработчики событий старого источника данных, связанные с текущим виджетом
		if(this.data)
			this.data.events.off(this);


		// определяем, является ли источник данных опорным
		if(pivot === undefined) pivot = true;
		this._pivot = pivot;



//		if(update !== false) update = true;

		//TODO custom data injector
		if( $.isString(data) ) {
			// var w = this;
			// while(!w._scope) {
			// 	w = w.parent;
			// }
			// if(w._scope) {
			// 	data = w._scope[data];
			// }
			// else {
			// 	throw new Error('Can not inject scope datasource into detached widget');
			// }
			var name_a = data.split(':');
			var src = this[name_a[0]];
			if(src == null) {
				throw new Error('Injecting data source ['+data+'] is undefined');
			}
			// if(src && !src.data) {
			// 	throw new Error('Injecting data source ['+data+'] has no property \"data\"');
			// }
			// src = src.data;
			if(name_a[1]) {
				var prop_a = name_a[1].split('.');
				while(prop_a.length) {
					if(src == null) {
						throw new Error('Injecting data source property ['+data+'] does not exist');
					}
					src = src[prop_a.shift()];
				}
			}
			// var src = (name_a.length == 1) ? this : this[name_a[0]];
			// var prop_a = name_a[1].split('.');
			// while(prop_a.length) {
			// 	src = src[prop_a.shift()];
			// }
			data = src;// src[name_a[1]];
		}


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		if(data_id) //'dataId' in o)
			this.__dta = (data instanceof Ergo.core.DataSource) ? data.entry(data_id) : new Ergo.core.DataSource(data, data_id);
		else
			this.__dta = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);





		// Если виджет является динамическим (управляется данными)
		if(o.dynamic) {

// 			// если добавлен новый элемент данных, то добавляем новый виджет
// 			this.data.events.on('entry:added', function(e){
//
// //				console.log(e);
//
// 				self.children.autobinding = false;
// 				var item = self.items.add({}, e.isLast ? null : e.index);
// 				self.children.autobinding = true;
// 				item.bind(e.entry);
//
// 				item._dynamic = true;
//
// 				item.render();
// 			}, this);

// 			// если элемент данных удален, то удаляем соответствующий виджет
// 			this.data.events.on('entry:deleted', function(e){
// 				var item = self.item({data: e.entry});
// 				if(item)
// 					item._destroy();
// //				self.children.remove( self.item({data: e.entry}) )._destroy();//e.index) );// {data: self.data.item(e.index)});
// 			}, this);

// 			// если элемент данных изменен, то создаем новую привязку к данным
// 			this.data.events.on('entry:changed', function(e){
// 				//FIXME странное обновление данных
// 				var item = self.item({data: e.entry});
// 				if(!item) {
// 					self.children.autobinding = false;
// 					item = self.items.add({});
// 					self.children.autobinding = true;
//
// 					item.bind(e.entry);
// 					item._dynamic = true;
// 				}
//
// 				//FIXME _rebind ?
// //				item.bind(/*self.data.entry(e.entry.id)*/e.entry, false, false);
// 	//			self.getItem( e.item.id )._dataChanged(); //<-- при изменении элемента обновляется только элемент
// 			}, this);


			// this.data.events.on('entryDirty', function(e){
			// 	if( self.options.dynamicFilter )
			// 		self._rebind(false);
			// });



			// если изменилось само значение массива, то уничожаем все элементы-виджеты и создаем их заново
			this.data.events.on('changed', function(e){

				// если diff не определен, то перерисовываем все
				if(e.created || e.updated || e.deleted) {
					self._rebind(true, e);
				}
				else {
					self._rebind(false);
					self._dataChanged(false, false);  //FIXME это нужно делать параметрами _rebind
				}

			}, this);


			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);

			// для корректного порядка обновления
			this.data.events.on('dirty', function(e){
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			}, this);

			// изменилось количество элементов данных или их содержимое
			this.data.events.on('diff', function(e) {

				self._rebind( false, {created: e.created, updated: e.updated, deleted: e.deleted} );

			}, this);



			// создаем вложенные элементы контейнера на основе источника данных

//			this.layout.immediateRebuild = false;

			this.children.filter(function(c){ return c._dynamic; }).applyAll('_destroy');

			var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : undefined;
			var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : undefined;
			var pager = o.dynamicPager ? o.dynamicPager.bind(this) : undefined;


			this.data.stream(filter, sorter, pager, function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;

					item._dynamic = true;

					item.bind(dataEntry, false, false);
//					item._pivot = false;

//					item.el.attr('dynamic', true);
			});

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();


			filter = o.renderFilter ? o.renderFilter.bind(this) : undefined;
			sorter = o.renderSorter ? o.renderSorter.bind(this) : undefined;
			pager = o.renderPager ? o.renderPager.bind(this) : undefined;

			var prev = undefined;
			this.items.stream(filter, sorter, pager, function(item, i) {

				item.render(null, null, prev); //FIXME возможны проблемы с условной отрисовкой

				if(item._rendered) {
					prev = item;
				}

				// if(item._dynamic && !item._rendered && item.options.autoRender !== false) {
				// 	self.dom.add(item, i);
				// }
			});

//			this._layoutChanged();

		}
		else {
			// STATIC BIND

			if(this._pivot || this.options.binding || this._dynamic) {


				this.data.events.on('changed', function(e) {

					// при изменении значения обновляем виджет, но только в "ленивом" режиме
					/*if(o.updateOnDataChanged)*/
					//self._dataChanged(true);
					self._rebind();
				}, this);

				this.data.events.on('dirty', function(e) {
					self._dataChanged(false, false); // ленивое обновление данных без каскадирования
				}, this);

				// отмечаем, что виджет реагирует на изменение данных
				this._static = true;

			}




			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);


//			this.data.events.on('value:changed', this._rebind.bind(this), this);

			// связываем данные с дочерними компонентами виджета при условии:
			//	1. если дочерний виджет является опорным (логически связан с другим источником данных), то игнорируем его
			// 	2. обновление дочернего виджета не производится (оно будет позже иницировано опорным элементом)
			//	3. дочернtve виджетe явно указывается, что он является опорным
			if(this.__c) {

				this.children.each(function(child){
					if(!child._pivot && child.data != self.data) child.bind(self.data, false, false);
				});
			}

		}

		// обновляем виджет (если это не запрещено в явном виде)
		if(update !== false /*&& !this.data.fetch*/) {
			this._dataChanged();
		}



		if(this.data.fetch) {
			this.data.on('fetched', function() {
				this._layoutChanged();
			}.bind(this), this);
		}

		// подключаем события data:
//		this._bindNsEvents('data');

		this._bindEvents('data');


//		if( this.data.options.fetchable ) {

		// this.data.events.on('fetched', function(){
		// 	// ?
		// 	w._layoutChanged();
		// }, this);

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });
//		}


//		this.events.fire('bound');
	},



	unbind: function() {
		//
		delete this._dta;
	},



	/**
	 *
	 * @protected
	 */
	_rebind: function(update, diff, initial) {

		var o = this.options;
		var self = this;


		if(!this.__dta) return;

		initial = initial || this;

//		console.log('rebind', this);

		// // если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		// if('dataId' in o)
			// data = (data instanceof Ergo.core.DataSource) ? data.entry(o.dataId) : new Ergo.core.DataSource(data, o.dataId);
		// else
			// data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);
//
		// // если источник данных отличается от уже привязанного, то выполняем новое связвание
		// if(data != this.data) {
			// this.bind(data, update, pivot);
			// return
		// }


		// console.log('rebind ('+self.options.dynamic+')');
		// console.log(''+self.options.html + ' ' + self.getValue());



		if(o.dynamic) {

//			console.log('rebind (dynamic)');

			// TODO

			if(diff) {
				this._dataDiff(diff.created, diff.deleted, diff.updated);

//				this._dataChanged(false, false);
			}
			else {

	//		console.log('rebind (dynamic)');

				// обновляем вложенные элементы контейнера на основе источника данных
	//			this.layout.immediateRebuild = false;

				// // уничтожаем все динамические элементы
				this.children.filter(function(c){ return c._dynamic; }).applyAll('_destroy');

	//			var t0 = Ergo.timestamp();

				var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : undefined;
				var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : undefined;
				var pager = o.dynamicPager ? o.dynamicPager.bind(this) : undefined;


				this.data.stream(filter, sorter, pager, function(dataEntry, i) {
	//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry });
					self.children.autobinding = false;

					item._dynamic = true;

					item.bind(dataEntry, undefined, false);
//					item._pivot = false;
	//					item.el.attr('dynamic', true);
	//					item.dataPhase = 2;
	//				item.render();
				});

	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);

				// this.layout.immediateRebuild = true;
				// this.layout.rebuild();

	//			if(!Ergo.noDynamicRender)
//				this.render();


				// filter = o.renderFilter ? o.renderFilter.bind(this) : undefined;
				// sorter = o.renderSorter ? o.renderSorter.bind(this) : undefined;
				// pager = o.renderPager ? o.renderPager.bind(this) : undefined;
				//
				// this.items.each(function(item, i) {
				// 	if(item._dynamic && !item._rendered) {
				// 		item.render();
				// 	}
				// }, filter, sorter, pager);

				this.render();

			}

			// обновляем виджет (если это не запрещено в явном виде)
//			if(update !== false) this._dataChanged(true);

		}
		else {


//			console.log('rebind (static)', this._pivot);

			if(this.__c) {

				this.children.each(function(child){
	//				if(!child._pivot) child.rebind(false);
					// 1. rebind не вызывается у дочерних элементов со своим dataSource
					// 2. rebind не вызывается у дочерних элементов с общим dataSource
					//      (работает некорректно, если rebind вызывается не событием)

					// дочерний элемент не является опорным
					// дочерний элнмент не является динамическим, связанным с данными инициатора rebind
					// дочерний элемент не имеет биндинга
					if(!child._pivot && !(initial.data == child.data && child.options.dynamic) && (child.data != self.data || update === false || !child._static)) {//child.options.binding)) {
						child._rebind(false, undefined, initial);
					}
				});

			}

			//TODO возможно, здесь нужно вызвать render() с выключенным каскадированием

//			this._layoutChanged();

		}


		// обновляем виджет (если это не запрещено в явном виде)
		// динамические элементы пропустим
		if(update !== false)
			this._dataChanged(undefined, undefined, true);



	},




  /**
	 * Каскадное обновление связывания
	 *
	 * Если указана функция связывания (`options.binding`), то она используется для обновления виджета
	 *
 	 * @param {Boolean} lazy если true, то не будут обновляться дочерние виджеты, имеющие тот же источник данных
 	 * @param {Boolean} cascade если равно false, то все дочерние виджеты не будут обновляться
 	 * @param {Boolean} noDynamic если равно true, то не будут обновляться дочерние виджеты, имеющие динамическое связывание
 	 *
	 * @protected
	 */
	_dataChanged: function(lazy, cascade, no_dynamic) {

//		this.events.fire('refresh');//, e);

		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;

//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;

		var binding = this.options.binding;

		if(binding && (('__dta' in this) || ('__val' in this))){ //FIXME неочевидная оптимизация

			if( typeof binding == 'string' ) {
				var a = binding.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
				if(action == null) {
					this._missedAction(binding, this.value);
				}
				else {
					action.call(this, a[1], this.value);
				}
//				this[binding] = this.value;
//				this.prop(binding, this.value);
			}
			else {
				if( binding.call(this, this.value) === false) return false;
//				if( binding.call(this, this.value) === false) return false;
			}
//			var val = this.getValue();
//			this._lock_value_change = true;
//			delete this._lock_value_change;

			/**
			 *
			 *
			 */
			this.events.fire('dataChanged');//, e);
		}

		// var e = new Ergo.events.CancelEvent({value: this.getValue()});
		// if(e.isCanceled) return;


		if(cascade === false)
			return;

		var self = this;

//		if(cascade !== false) {
		this.children.each(function(child){

			if(no_dynamic && child.options.dynamic) return;

			// Отменяем обновление дочернего элемента, если:
			//  1. определен источник данных
			//  2. источник данных дочернего элемента совпадает с текущим
			//  3. дочерний элемент имеет свой независимый источник данных
			if(lazy && child.data && child.data == self.data) return;
			if(child._pivot || child.options.autoBind === false) return; //FIXME динамические элементы являются опорными => это условие всегда срабатывает
//			if(lazy && child.options.dynamic) return;
			child._dataChanged(lazy, cascade, no_dynamic);
		});
//		}
//			this.children.applyAll('_dataChanged', [true]);

//		this.children.each(function(child) { child._dataChanged(); });

	},




	_dataDiff: function(created, deleted, updated) {

		var o = this.options;

		var filter = o.dynamicFilter ? o.dynamicFilter.bind(this) : null;
		var sorter = o.dynamicSorter ? o.dynamicSorter.bind(this) : null;
		var pager = o.dynamicPager ? o.dynamicPager.bind(this) : null;


		var rerender_a = [];
		var rerender_new_a = [];



//		console.log( 'Diff (create, delete, update)', created && created.length, deleted && deleted.length, updated && updated.length );

//		console.log(created, deleted, updated);

		var self = this;



		if(deleted) {
//			this.items.each(function(item) { console.log('k', item._index); });
			// DELETED
			for(var i = 0; i < deleted.length; i++) {
				var e = deleted[i];
				var item = this.item({data: e});
				if(item) {
					item._destroy();
				}
			}
//			this.items.each(function(item) { console.log('m', item._index); });
		}



		// this.items.each(function(item) {
		// 	var ok = false;
		// 	self.data.entries.each(function(entry) {
		// 		if( entry == item.data )
		// 			ok = true;
		// 	});
		// 	if(!ok)
		// 		console.warn('before create', item);
		// });



		if(created) {
			// CREATED
			for(var i = 0; i < created.length; i++) {
				var e = created[i];
				var index = e._id[0];
				var value = e._val();


				if(!filter || filter(e._val(), index)) {

					var kv0 = [index, value];

//					console.log('kv', index, value);


					// var compare = function(item) {
					// 	if(sorter) {
					// 		var kv1 = [item.data._id[0], item.data._val()];
					// 		return sorter.call(e, kv0, kv1)
					// 	}
					// 	else {
					// 		return kv0[0] - item.data._id[0];
					// 	}
					// }
					//
					//
					//
					//
					//
					// var after = _qfind(this.items, compare);


					var after = this.items.find(function(item) {
						if(sorter) {
							return true;
							// var kv1 = [item.data._id[0], item.data._val()];
							// if( sorter.call(e, kv0, kv1) <= 0 ) {
							// 	return true;
							// }
						}
						else {
							if( index <= item.data._id[0] ) {
								return true;
							}
						}
					});

					if(sorter)
						index = null;
					else
						index = after ? after._index : null;

//					console.log('create', index);

					// добавляем элемент последним
					this.children.autobinding = false;
					var item = this.items.add({}, index);
					this.children.autobinding = true;
					item._dynamic = true;
					item.bind(e, true, false);


//					item.render();
					rerender_new_a.push(item);


				}
			}
		}



		// this.items.each(function(item) {
		// 	var ok = false;
		// 	self.data.entries.each(function(entry) {
		// 		if( entry == item.data )
		// 			ok = true;
		// 	});
		// 	if(!ok)
		// 		console.warn('before update', item);
		// });



		if(updated) {
			// UPDATED

			var n_upd = 0;

			for(var i = 0; i < updated.length; i++) {


				var e = updated[i];
				var _item = this.item({data: e});
				var index = e._id[0];
				var value = e._val();



				if(filter) {
					if( !filter(value, index) ) {
						if( _item ) {
							_item._destroy();
							_item = null;
						}
						continue;
					}
				}

//				console.log('kv', index, value);


				var kv0 = [index, value];


				// var compare = function(item) {
				// 	if(sorter) {
				// 		var kv1 = [item.data._id[0], item.data._val()];
				// 		return (item == _item) ? 1 : sorter.call(e, kv0, kv1)
				// 	}
				// 	else {
				// 		return kv0[0] - item.data._id[0];
				// 	}
				// }
				//
				//
				// var after = _qfind(this.items, compare);



				var after = this.items.find(function(item) {
					if(sorter) {
						return true;
						// var kv1 = [item.data._id[0], item.data._val()];
						// // TODO возможно не нужно исключать себя из проверки
						// if( item != _item && sorter.call(e, kv0, kv1) <= 0 ) {
						// 	return true;
						// }
					}
					else {
						if( item != _item && index <= item.data._id[0] ) {
							return true;
						}
					}
				});


				if(sorter)
					index = null;
				else
					index = after ? after._index : null;

//				console.log('update', index, !_item);

				if( !_item ) {

					this.children.autobinding = false;
					_item = this.items.add({}, index);
					this.children.autobinding = true;
					_item._dynamic = true;
					_item.bind(e, false, false);  // обновляться здесь не надо

					rerender_new_a.push( _item );
					// if(!sorter) {
					// 	rerender_a.push( _item );
					// }
					// else {
//						_item.render();
//					}

				}
				else {

//					console.log('relocate', _item._index, ' => ', index, ' of ', this.items.size());

					if(!sorter) {
						// FIXME
						if(index != _item._index+1) {
							n_upd++;
//							_item.unrender()
							this.items.remove(_item);
							this.items.add(_item, index);
//							_item.render()

							rerender_a.push( _item );
						}
					}

				}





			}


//			console.log('обновлений позиции', n_upd);
		}



		//
		// [id0, val0, index, item]
		//





		if( sorter ) {

//			var item_values = [];
//			var item_indices = [];

			var kv_a = [];
			this.items.each(function(item, i) {
				kv_a.push( [item.data._id[0], item.data._val(), i, item] );
//				item_values.push(item.data._val());//.timeState);
//				item_indices.push(item._index);//.timeState);
			});

			// Sorting KV-array
			kv_a.sort(sorter);


			$ergo.fixDisorder(kv_a, function(i, j) {

				var _item = this.items.get(i);

				//TODO нужно оптимизировать с помощью функции items.move()
				this.items.remove(_item);
				this.items.add(_item, j);

				rerender_a.push( _item );

			}.bind(this));


/*
			var offset_a = [];

//			var values = [];
//			var indices = [];

			kv_a.forEach(function(kv, i) {
				offset_a[kv[2]] = kv[2] - i;
//				indices.push(kv[2]);
//				values.push(kv[1]);//.timeState);
			});

//			console.log( 'indices', indices );
//			console.log( 'item_values', JSON.parse(JSON.stringify(item_values)) );
//			console.log( 'item_indices', JSON.parse(JSON.stringify(item_indices)) );
//			console.log( 'values', JSON.parse(JSON.stringify(values)) );
//			console.log( 'corrections', JSON.parse(JSON.stringify(corr_a)) );

			var n = 0;

			var measure_a = [];

			var moved_a = [];

			while( n < kv_a.length+1 ) {



				var max_measure = [-1,-1];

				measure_a = [];

				for(var i = 0; i < kv_a.length; i++) {
	//				var i_item = this.items.get(i);
					var i_index = i - offset_a[i];

					if( moved_a[i_index] )
						continue;

					var measure = [-1, -1, -1];


					for(var j = 0; j < kv_a.length; j++) {
						var j_index = j - offset_a[j];

	//					var j_item = this.items.get(j);
						if( (j < i && j_index > i_index) || (j > i && j_index < i_index) ) {
							if(measure[0] == -1) {
								measure[1] = j;// Math.min(measure[1], j);
							}
							measure[2] = j;//Math.max(measure[2], j);
							measure[0]++;
						}
					}

					measure_a[i] = measure;

					if(measure[0] > max_measure[0]) {
						max_measure[0] = measure[0];
						max_measure[1] = measure[1];
						max_measure[2] = measure[2];
						max_measure[3] = i;
					}

				}

				if(max_measure[0] == -1)
					break;


				n++;



				// var k = 0;
				//
				// for(var i = 0; i < measure_a.length; i++) {
				// 	if(max_measure[0] == measure_a[i][0])
				// 		k++;
				// }

//				console.log( 'max measure, count', max_measure, k);

				// выполняем перемещение
				var _i = max_measure[3];
				var _j = (max_measure[2] > max_measure[3]) ? max_measure[2] : max_measure[1];

				var _item = this.items.get(_i);

//				console.log('index', _i, _j);

				//TODO нужно оптимизировать с помощью функции items.move()
//				_item.unrender()
				this.items.remove(_item);
				this.items.add(_item, _j);
//				_item.render()

				rerender_a.push( _item );


				moved_a[_i-offset_a[_i]] = true;


				var i_offset = offset_a[_i];

				if(_j < _i) {
					for(var i = _i; i > _j; i--) {
						offset_a[i] = offset_a[i-1]+1;
					}
//					offset_a[_j] = offset_a[_j+1]
				}
				if(_j > _i) {
					for(var i = _i; i < _j; i++) {
						offset_a[i] = offset_a[i+1]-1;
					}
//					offset_a[_j] = offset_a[_j-1]
				}

				offset_a[_j] = i_offset + (_j - _i);

			}
*/

//			console.log( 'итераций', n );

			// console.log( 'measures', measure_a );
			// console.log( 'offsets', offset_a );




		}


		this.events.fire('diff', {created: rerender_new_a, updated: rerender_a});


	}




	// is_bound: function() {
	// 	return (this.data != null);
	// },




};
