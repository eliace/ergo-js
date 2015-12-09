

/**
 *
 * @mixin selectable
 *
 */
Ergo.alias('includes:selectable', {

	defaults: {
		// selection: {
		// 	lookup: null,
		// 	multiselect: false
		// },
		events: {
			'select': function(e) {
				this.selection.set( e.key != null ? e.key : (e.target.opt('name') || e.target._index) );
				e.stop();
			},
			'unselect': function(e) {
				this.selection.unset( e.key != null ? e.key : (e.target.opt('name') || e.target._index) );
				e.stop();
			}
		}
	},


	overrides: {

		set selected(selection) {
			this.selection.set(selection);
		},

		get selected() {
			return this.selection.get();
		}

	},


	_construct: function(opts) {

		var o = opts.selection || {};

		this.selection = {

			_widget: this,

			_selected: (o.multiselect) ? {} : null,

			set: function(key) {

				if(key == undefined) return null;

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;

				var selected = null;
				// ищем выбранный элемент
				if( key instanceof Ergo.core.Object ) {
					selected = key;
					key = selected.opt('name');
				}
				else {
					selected = lookup.call(this._widget, key);
				}
//				var selected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);

				// TODO здесь нужно обработать вариант, если элемент не найден


				// если новый ключ совпадает со старым, то не меняем выборку
	//			for(var i = 0; i < this._selected.length; i++)
	//				if(this._selected[i] == selected) return;


				// если выборка эксклюзивная, то нужно очистить текущую выборку
				if(!multiselect) {
					if(this._selected) {
						this._selected.states.unset('selected');
					}
				}
				else {

					if(!this._selected)
						this._selected = {};

					if(this._selected[key]) {
						this._selected[key].states.unset('selected');
					}
				}


				// //
				// if(!multiselect)
				// 	this._selected = [];


				if(selected == null) return;


				if(!multiselect) {
					this._selected = selected;
				}
				else {
					this._selected[key] = selected;
				}
//				this._selected.push(selected);


				selected.states.set('selected');


				this._widget.events.fire('selectionChanged', {selection: this.get(), selected: selected});

				return selected;
			},


			unset: function(key) {

				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = o.multiselect;


				var unselected = null;

				if( arguments.length == 0 ) {
					unselected = this._selected;
				}
				else {
					// ищем выбранный элемент
//					unselected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);

					if( key instanceof Ergo.core.Object ) {
						unselected = key;
						key = unselected.opt('name');
					}
					else {
						unselected = lookup.call(this._widget, key);
					}


				}



				if(unselected == null) return;


				if(!multiselect) {
					this._selected = null;
				}
				else {
					delete this._selected[key];
				}

//				Ergo.remove(this._selected, unselected);
//				this._selected.remove(unselected);

				unselected.states.unset('selected');


				this._widget.events.fire('selectionChanged', {selection: this.get(), unselected: unselected});

			},


			get: function(i) {
				if(arguments.length == 0) {
					return this._selected;
				}
				else {
					return this._selected ? this._selected[i] : null;
				}
			},


			toggle: function(key) {
				var o = this._widget.options.selection || {};

				// определяем метод поиска
				var lookup = o.lookup || this._widget.item;

				var selected = null;

				if( key instanceof Ergo.core.Object ) {
					selected = key;
					key = selected.opt('name');
				}
				else {
					selected = lookup.call(this._widget, key);
				}


				if(!selected)
					return;


				if( selected.states.is('selected') ) {
					this.unset(key);
				}
				else {
					this.set(key);
				}

			},


			is_empty: function() {
				return this._selected.length == 0;
			},

			size: function() {
				return this._selected.length;
			},

			each: function(fn) {
				var o = this._widget.options.selection || {};

				if(!o.multiselect) {
					fn.call(this, this._selected);
				}
				else {
					for(var i in this._selected) {
						fn.call(this, this._selected[i]);
					}
				}

				// for(var item in this._selected) {
				//
				// }
				//
				// this._selected.forEach(fn);
			},

			clear: function() {
				var o = this._widget.options.selection || {};

				this.each(function(selected) {
					selected.states.unset('selected');
				});

				this._selected = o.multiselect ? {} : null;

				this._widget.events.fire('selectionChanged', {selection: this.get()});
			}


		};


	}


});
