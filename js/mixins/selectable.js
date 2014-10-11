


Ergo.defineMixin('Ergo.mixins.Selectable', function(o) {
	
	o.events = Ergo.smart_override({
		'select': function(e) {
			this.opt('selected', e.key != null ? e.key : (e.target._name || e.target._index));
			e.stop();
		}
	}, o.events);

	Ergo.smart_build(o);
	
	
	// this.selection = {
// 		
		// _widget: this,
// 		
		// set: function(v) {
// 
// 			
			// if(this._selected)
				// this._selected.states.unset('selected');
// 				
	// //		this.content.opt('visible', v);
// 			
			// this._selected = v;// this.tabs.item(v);
// 			
			// if(this._selected)
				// this._selected.states.set('selected');
// 			
			// this.events.fire('selectionChanged');
// 			
		// },
// 		
		// get: function() {
// 			
		// }
// 		
	// };
	
	
	
	this.setSelected = function(key) {
		
		
		// если новый ключ совпадает со старым, то не меняем выборку
		if(this._selected && this._selected == key) return;
		
		// определяем метод поиска
		var finder = this.options.selectionFinder || this.item;
		
		
		if(this._selected) {
			var target = $.isArray(this._selected) ? this._selected : [this._selected];
			
			for(var i = 0; i < target.length; i++) {
				if(target[i]) target[i].states.unset('selected');
			}
		}
		
		
		this._selected = finder.call(this, key);
		
		
		if(this._selected) {
			var target = $.isArray(this._selected) ? this._selected : [this._selected];
			
			for(var i = 0; i < target.length; i++) {
				if(target[i]) target[i].states.set('selected');
			}
		}
		
		
/*		
		// убираем состояние selected с текущей выборки
		if(this._selected !== undefined && this._selected !== null) {
			var target = finder.call(this, this._selected);
			
			if( !$.isArray(target)) target = [target];
	
			for(var i = 0; i < target.length; i++) {
				if(target[i]) target[i].states.unset('selected');
			}
		}

		this._selected = key;

		// устанавливаем состояние selected на новой выборке

		if(this._selected !== undefined && this._selected !== null) {
			target = finder.call(this, this._selected);
			
			if( !$.isArray(target)) target = [target];
	
			for(var i = 0; i < target.length; i++) {
				if(target[i]) target[i].states.set('selected');
			}
		}
*/
		
		this.events.fire('selected', {selection: this._selected, key: key});
	};
	
	
	this.getSelected = function() {
		return this._selected;
	};
	
	
	
}, 'mixins:selectable');



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
	
	
	initialize: function(w, o) {
		this.$super(o);
		
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










