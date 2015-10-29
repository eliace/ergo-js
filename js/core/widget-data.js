


Ergo.WidgetData = {


  /**
	 * Подключение данных к виджету
	 *
	 * Если опция autoBind = false, то связывание осуществлено не будет.
	 *
	 * @param {Object|Array|string} data подключаемые данные
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
			var src = (name_a.length == 1) ? this : this[name_a[0]];
			data = src[name_a[1]];
		}


		// если определен параметр dataId, то источником данных будет дочерний элемент, если нет - то сам источник данных
		if(data_id) //'dataId' in o)
			this.data = (data instanceof Ergo.core.DataSource) ? data.entry(data_id) : new Ergo.core.DataSource(data, data_id);
		else
			this.data = (data instanceof Ergo.core.DataSource) ? data : new Ergo.core.DataSource(data);


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
				var diff = (e.created || e.updated || e.deleted) ? {created: e.created, updated: e.updated, deleted: e.deleted} : null;

				self._rebind(true, diff);

			}, this);


			// this.data.events.on('value:sync', function(e){
			//
			// 	self._dataChanged();
			//
			// }, this);

			// для корректного порядка обновления
			this.data.events.on('dirty', function(e){
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			});

			// изменилось количество элементов данных или их содержимое
			this.data.events.on('diff', function(e) {

				self._rebind( false, {created: e.created, updated: e.updated, deleted: e.deleted} );

			}, this);



			// создаем вложенные элементы контейнера на основе источника данных

//			this.layout.immediateRebuild = false;

			this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

			this.data.each(function(dataEntry, i){
//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry, 'autoUpdate': false });
					self.children.autobinding = false;

					item.bind(dataEntry, false);
					item._pivot = false;
					item._dynamic = true;
//					item.el.attr('dynamic', true);
			}, this.options.dynamicFilter, this.options.dynamicSorter);

			// this.layout.immediateRebuild = true;
			// this.layout.rebuild();

			this.render(false);
		}
		else {
			// STATIC BIND

			this.data.events.on('changed', function(e) {
				// при изменении значения обновляем виджет, но только в "ленивом" режиме
				/*if(o.updateOnDataChanged)*/
				//self._dataChanged(true);
				self._rebind();
			}, this);

			this.data.events.on('dirty', function(e) {
				self._dataChanged(false, false); // ленивое обновление данных без каскадирования
			}, this);



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
		if(update !== false && !this.data.options.fetchable) this._dataChanged();


		// подключаем события data:
		this._bindNsEvents('data');


//		if( this.data.options.fetchable ) {

		this.data.events.on('fetch:before', function(){
			w.events.fire('fetch');
		}, this);
		this.data.events.on('fetch:after', function(){
			w._layoutChanged();
			w.events.fire('fetched');
		}, this);

		// если установлен параметр autoFetch, то у источника данных вызывается метод fetch()
		if(o.autoFetch)	this.data.fetch();//.then(function(){ self.events.fire('fetch'); });
//		}


		this.events.fire('bound');
	},



	unbind: function() {
		//
	},



	/**
	 *
	 * @protected
	 */
	_rebind: function(update, diff) {

		var o = this.options;
		var self = this;


		if(!this.data) return;

//		console.log('rebind');

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
				this.children.filter(function(c){ return c._dynamic; }).apply_all('_destroy');

	//			var t0 = Ergo.timestamp();

				this.data.each(function(dataEntry, i){
	//					self.items.add({}).bind(dataEntry, true, 2);
					self.children.autobinding = false;
					var item = self.items.add({});//{ 'data': dataEntry });
					self.children.autobinding = false;

					item.bind(dataEntry);
					item._pivot = false;
					item._dynamic = true;
	//					item.el.attr('dynamic', true);
	//					item.dataPhase = 2;
	//				item.render();
				}, this.options.dynamicFilter, this.options.dynamicSorter);

	//			var t1 = Ergo.timestamp();
	//			console.log(t1 - t0);

				// this.layout.immediateRebuild = true;
				// this.layout.rebuild();

	//			if(!Ergo.noDynamicRender)
				this.render();
			}

			// обновляем виджет (если это не запрещено в явном виде)
//			if(update !== false) this._dataChanged(true);

		}
		else {

//		console.log('rebind (static)');

			if(this.__c) {

				this.children.each(function(child){
	//				if(!child._pivot) child.rebind(false);
					// 1. rebind не вызывается у дочерних элементов со своим dataSource
					// 2. rebind не вызывается у дочерних элементов с общим dataSource
					//      (работает некорректно, если rebind вызывается не событием)
					if(!child._pivot && (child.data != self.data || update === false)) {
							child._rebind(false);
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

		// если отключено каскадирование, то обновление не производим
//		if(cascade && !this.options.cascading) return;

//		if(!this.options.autoBind /*|| this._lock_data_change*/) return;

		var binding = this.options.binding;

		if(/*this.data &&*/ binding){
			if( $.isString(binding) ) {
				this.opt(binding, this.opt('value'));
			}
			else {
				if( binding.call(this, this.opt('value')) === false) return false;
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
//			this.children.apply_all('_dataChanged', [true]);

//		this.children.each(function(child) { child._dataChanged(); });

	},




	_dataDiff: function(created, deleted, updated) {

		var filter = this.options.dynamicFilter;
		var sorter = this.options.dynamicSorter;


		if(deleted) {
//			this.items.each(function(item) { console.log('k', item._index); });
			// DELETED
			for(var i = 0; i < deleted.length; i++) {
				var e = deleted[i];
				var item = this.item({data: e});
				if(item)
					item._destroy();
			}
//			this.items.each(function(item) { console.log('m', item._index); });
		}



		if(created) {
			// CREATED
			for(var i = 0; i < created.length; i++) {
				var e = created[i];
				var index = e._id[0];
				var value = e._val();


				if(!filter || filter.call(this, e._val(), index)) {

// 					// если есть фильтрация и сортировка, то индексы не совпадают, поэтому нужен поиск
// 					if( filter || sorter ) {
// 						var after = null;
// 						var kv0 = [index, value];
// 						// FIXME поменять поиск на бинарный
// 						after = this.items.find(function(item) {
// 							var kv1 = [item.data._id[0], item.data._val()];
// 							if( (sorter && sorter.call(e, kv0, kv1) <= 0) || (!sorter && kv0[0] <= kv1[0]) ) {
// //								console.log(kv1[1]);
// 								return true;
// 							}
// 						});
//
// 						index = after ? after._index : null;
// 					}

					var kv0 = [index, value];
					var after = this.items.find(function(item) {
						if(sorter) {
							var kv1 = [item.data._id[0], item.data._val()];
							if( sorter.call(e, kv0, kv1) <= 0 ) {
								return true;
							}
						}
						else {
							if( index <= item.data._id[0] ) {
								return true;
							}
						}
					});

					index = after ? after._index : null;

					// добавляем элемент последним
					this.children.autobinding = false;
					var item = this.items.add({}, index);
					this.children.autobinding = true;
					item.bind(e, true, false);

					item._dynamic = true;

					item.render();


				}
			}
		}




		if(updated) {
			// UPDATED

			for(var i = 0; i < updated.length; i++) {


				var e = updated[i];
				var _item = this.item({data: e});
				var index = e._id[0];
				var value = e._val();



				if(filter) {
					if( !filter.call(this, e._val(), index) ) {
						if( _item ) {
							_item._destroy();
							_item = null;
						}
						continue;
					}
				}

//				console.log(index, value);

				var kv0 = [index, value];

				var after = this.items.find(function(item) {
					if(sorter) {
						var kv1 = [item.data._id[0], item.data._val()];
						// TODO возможно не нужно исключать себя из проверки
						if( item != _item && sorter.call(e, kv0, kv1) <= 0 ) {
							return true;
						}
					}
					else {
						if( index <= item.data._id[0] ) {
							return true;
						}
					}
				});


				index = after ? after._index : null;

				if( !_item ) {

					this.children.autobinding = false;
					_item = this.items.add({}, index);
					this.children.autobinding = true;
					_item.bind(e, false, false);  // обновляться здесь не надо

					_item._dynamic = true;

					_item.render();

				}
				else {

					if(index != _item._index+1) {
						this.items.remove(_item);
						this.items.add(_item, index);
					}

				}



/*
				if(filter) {
					if( !filter.call(this, e._val(), index) ) {
						if( _item ) {
							_item._destroy();
							_item = null;
						}
					}
					else if( !_item ) {

//						console.log('---', index, value);

						// ищем первый элемент, у которого индекс больше либо равен новому
						var after = this.items.find(function(item) {
//							console.log(item.data._id[0]);
							if( index <= item.data._id[0] ) {
								return true;
							}
						});

						// добавляем элемент последним
						this.children.autobinding = false;
						var item = this.items.add({}, after ? after._index : null);
						this.children.autobinding = true;
						item.bind(e, false, false);  // обновляться здесь не надо

						item._dynamic = true;

						item.render();

					}
				}



//				console.log('before sort', this.items.size())

				if(sorter && _item) {


//					console.log('sort', index, value);

//					var after = null;
					var kv0 = [index, value];
					var after = this.items.find(function(item) {
						var kv1 = [item.data._id[0], item.data._val()];
						if( item != _item && sorter.call(e, kv0, kv1) <= 0 ) {
//							console.log(kv1[1]);
							return true;
//							return false;
						}
					});




//					console.log(this.items.size(), _item, _item._index)


//					console.log('sort', after, _item);

					// if( after && after._index == _item._index+1 ) {
					// 	// ничего не делаем
					// }
					// else {
						this.items.remove(_item);

//						console.log(this.items.size())
//						console.log(after._index);

//						this.items.each(function(item) { console.log('n', item._index); });


						this.items.add(_item, after ? after._index : null);

//						this.items.each(function(item) { console.log('m', item._index); });

//					}

//					if(after != _item) {
// 						if(after) {
// //							console.log('after', after.data.get());
// 							this.items.remove(_item);
// 							this.items.add(_item, after._index);
// 						}
// 						else {
// 							this.items.remove(_item);
// 							this.items.add(_item);
// 						}
						// if(after && _item._index < after._index) {
						// 	this.items.remove(_item);
						// 	this.items.add(_item, after._index-1);
						// }
						// else {
						// }
//					}

				}



//				console.log('after sort', this.items.size())
*/


			}
		}




	},




	is_bound: function() {
		return (this.data != null);
	},




};
