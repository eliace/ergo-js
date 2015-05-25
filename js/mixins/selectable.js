


Ergo.alias('includes:selectable', {

	defaults: {
		events: {
			'select': function(e) {
				this.selection.set( e.key != null ? e.key : (e.target._name || e.target._index) );
				e.stop();
			},
			'unselect': function(e) {
				this.selection.unset( e.key != null ? e.key : (e.target._name || e.target._index) );
				e.stop();
			}
		}
	},


	_construct: function(o) {

		this.selection = {
			
			_widget: this,
			
			_selected: [],
			
			set: function(key) {
				
				// определяем метод поиска
				var lookup = this._widget.options.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = this._widget.options.multiselect;
		
		
				// ищем выбранный элемент
				var selected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);
		
				// TODO здесь нужно обработать вариант, если элемент не найден
		
				
				// если новый ключ совпадает со старым, то не меняем выборку
	//			for(var i = 0; i < this._selected.length; i++)
	//				if(this._selected[i] == selected) return;
				
				
				// если выборка эксклюзивная, то нужно очистить текущую выборку
				if(!multiselect) {
					for(var i = 0; i < this._selected.length; i++) {
						this._selected[i].states.unset('selected');
					}
				}
				
				
				
				//
				if(!multiselect)
					this._selected = [];
				
				
				if(selected == null) return;
				
				
				this._selected.push(selected);
				
				
				selected.states.set('selected');
				
						
				this._widget.events.fire('selectionChanged', {selection: this.get()});		
			},
			
			
			unset: function(key) {
				
				// определяем метод поиска
				var lookup = this._widget.options.lookup || this._widget.item;
				// режим множественной выборки
				var multiselect = this._widget.options.multiselect;
				
				// ищем выбранный элемент
				var unselected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);
				
	//			Ergo.remove(this._selected, unselected);
				this._selected.remove(unselected);
				
				unselected.states.unset('selected');
				
				
				this._widget.events.fire('selectionChanged', {selection: this.get()});
				
			},
			
			
			get: function() {
				return (this._widget.options.multiselect) ? this._selected : this._selected[0];
			},
			
			
			is_empty: function() {
				return this._selected.length == 0;
			},
			
			size: function() {
				return this._selected.length;
			},
			
			each: function(fn) {
				this._selected.forEach(fn);
			},
			
			clear: function() {
				this._selected = [];
				this._widget.events.fire('selectionChanged', {selection: this.get()});
			}
			
			
		};


	
	
	
	
		this.set_selected = function(selection) {
			this.selection.set(selection);
		};
		
		
		this.get_selected = function() {
			return this.selection.get();
		};


	}


});



/*
Ergo.defineMixin('Ergo.mixins.Selectable', function(o) {
	
	o.events = Ergo.smart_override({
		'select': function(e) {
			this.selection.set( e.key != null ? e.key : (e.target._name || e.target._index) );
			e.stop();
		},
		'unselect': function(e) {
			this.selection.unset( e.key != null ? e.key : (e.target._name || e.target._index) );
			e.stop();
		}
	}, o.events);


	this.selection = {
		
		_widget: this,
		
		_selected: [],
		
		set: function(key) {
			
			// определяем метод поиска
			var lookup = this._widget.options.lookup || this._widget.item;
			// режим множественной выборки
			var multiselect = this._widget.options.multiselect;
	
	
			// ищем выбранный элемент
			var selected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);
	
			// TODO здесь нужно обработать вариант, если элемент не найден
	
			
			// если новый ключ совпадает со старым, то не меняем выборку
//			for(var i = 0; i < this._selected.length; i++)
//				if(this._selected[i] == selected) return;
			
			
			// если выборка эксклюзивная, то нужно очистить текущую выборку
			if(!multiselect) {
				for(var i = 0; i < this._selected.length; i++) {
					this._selected[i].states.unset('selected');
				}
			}
			
			
			
			//
			if(!multiselect)
				this._selected = [];
			
			
			if(selected == null) return;
			
			
			this._selected.push(selected);
			
			
			selected.states.set('selected');
			
					
			this._widget.events.fire('selectionChanged', {selection: this.get()});		
		},
		
		
		unset: function(key) {
			
			// определяем метод поиска
			var lookup = this._widget.options.lookup || this._widget.item;
			// режим множественной выборки
			var multiselect = this._widget.options.multiselect;
			
			// ищем выбранный элемент
			var unselected = (key instanceof Ergo.core.Object) ? key : lookup.call(this._widget, key);
			
//			Ergo.remove(this._selected, unselected);
			this._selected.remove(unselected);
			
			unselected.states.unset('selected');
			
			
			this._widget.events.fire('selectionChanged', {selection: this.get()});
			
		},
		
		
		get: function() {
			return (this._widget.options.multiselect) ? this._selected : this._selected[0];
		},
		
		
		is_empty: function() {
			return this._selected.length == 0;
		},
		
		size: function() {
			return this._selected.length;
		},
		
		each: function(fn) {
			this._selected.forEach(fn);
		},
		
		clear: function() {
			this._selected = [];
			this._widget.events.fire('selectionChanged', {selection: this.get()});
		}
		
		
	};


	
	
	
	
	this.set_selected = function(selection) {
		this.selection.set(selection);
//		this._selected = (this.options.multiselect) ? selection : [selection];
		
	};
	
	
	this.get_selected = function() {
		return this.selection.get();
	};
	
	
	
//	this._selected = [];
	
	
	
}, 'mixins:selectable');
*/


/*
Ergo.defineMixin('Ergo.mixins.Selection', function(o) {


	
	this.selection = new Ergo.core.Selection(this);
	
	Ergo.smart_override(o, {
		events: {
			'selected': function(e) {
				this.selection.set(e.target);
//				e.target.states.set('selected');
			} 
		}
	});
	
	
	// this.setSelected = function(i) {
		// this.item(i).select();
	// }
	
	Ergo.smart_build(o);
	
}, 'mixins:selection');






Ergo.defineMixin('Ergo.mixins.Selectable', function(o) {
	
	Ergo.smart_override(o, {
		states: {
			'selected': 'selected'
		},
		events: {
			'jquery:click': function(e, w) {
				w.states.set('selected');
			},
			'stateChanged': function(e) {
				if(e.to == 'selected') {
					this.events.rise('selected');
				}
			}
		}
	});

	Ergo.smart_build(o);
	
	// this.select = function() {
		// this.states.set('selected');
		// this.events.rise('selected');		
	// };
	
}, 'mixins:selectable');







Ergo.defineClass('Ergo.core.Selection', 'Ergo.core.Object', {
	
	
	_initialize: function(w, o) {
		this._super(o);
		
		this._widget = w;
	},

	
	set: function(item) {
		
		if(this._selected)
			this._selected.states.unset('selected');
		
		item.states.set('selected');
		
		this._selected = item;
		
		this._widget.events.fire('selectionChanged');
	},
	
	
	get: function() {
		return this._selected;
	}
	
	
});

*/










