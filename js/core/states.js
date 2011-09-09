
//= require "events"





/**
 * @class
 */
Ergo.core.StateCollection = Ergo.declare('Ergo.core.StateCollection', 'Ergo.core.Object', /** @lends Ergo.StateManager.prototype */ {
	
	initialize: function(widget) {
		this._widget = widget;
		this._states = {};
	},
	
	/**
	 * Активация состояния
	 * @param {String} name имя состояния
	 */
	set: function(name, change_class) {
		
//		if(!name || this.is(name)) return;
		
		var e = new Ergo.events.CancelEvent({'state': name, 'op': 'set'});
		this._widget.events.fire('onBeforeStateChange', e);
		if(e.isCanceled) return;
		
		
		// получаем состояние, определенное для виджета
		var state = this._widget.options.states[name];
//		var state_off, state_on = null;
		if(state == null) state = name;//{ state_on = name; state_off = ''; }
		
//		else if($.isString(state)) { state_on = state; state_off = ''; }
		else if($.isArray(state)) { //{ state_on = state[0]; state_off = state[1]; }
			this.set(state[0]);
			this.clear(state[1]);
			this._states[name] = true;
			return this;
		}
		
//		if( $.isString(state) ) {
//			this.widget.el.addClass(state);
//			this.widget.el.removeClass(state_off);
//		}

		if(arguments.length == 1) change_class = true;
		
		
		var self = this;
		
		var state_change_callback = function(change) {
			
			if(change !== false)
				self._widget.el.addClass(state);
			
			self._states[name] = true;
			
			self._widget.events.fire('onStateChange', {'state': name, 'op': 'set'});
			self._widget.events.fire('onStateSet', {'state': name});			
		}
		
		
//		var is_deferred = false;
		
		if($.isFunction(state)) {
			var result = state.call(this._widget, true);
			
//			if(result instanceof Ergo.core.Deferred) {
//				if(!result.used) {
//					result.then(state_change_callback);
//					is_deferred = true;
//				}
//			}
//			else {
				change_class = result;
//			}
			
//			change_class &= (result !== false);
			state = name;
		}
		
//		if(!is_deferred)
		state_change_callback(change_class);
		
//		if(change_class)
//			this._widget.el.addClass(state);
//		
//		this._states[name] = true;
//		
//		this._widget.events.fire('onStateChange', {'state': name, 'op': 'set'});
//		this._widget.events.fire('onStateSet', {'state': name});
		
		return this;
	},
	
	/**
	 * Активация указанного состояния и отключение всех остальных состояний
	 * @param {String} name
	 */
	setOnly: function(name) {
		for(var i in this._states) this.clear(i);
		this.set(name);	
		
		return this;		
	},
	
	/**
	 * Дезактивация состояния
	 * @param {String} name имя состояния
	 */
	clear: function(name) {
		
//		if(!name || !this.is(name)) return;
		
		
		var e = new Ergo.events.CancelEvent({'state': name, 'op': 'clear'});
		this._widget.events.fire('onBeforeStateChange', e);
		if(e.isCanceled) return;		

		
		if(name instanceof RegExp) {
			var names = Ergo.filter(this._states, function(s, i){ return i.match(name); });
			for(var i in names) this.clear(i);
			return this;			
		}

//		// если указанное состояние не определено, то очистку не выполняем
//		if(!(name in this._states)) return this;
		
		// получаем состояние, определенное для виджета
		var state = this._widget.options.states[name];		
//		var state_off, state_on = null;
		if(state == null) state = name;//{ state_on = name; state_off = ''; }		
		
//		else if($.isString(state)) { state_on = state; state_off = ''; }
		else if($.isArray(state)) {//{ state_on = state[0]; state_off = state[1]; }
			this.clear(state[0]);
			this.set(state[1]);
			delete this._states[name];
			return this;
		}
		
		
		var change_class = true;

//		if( $.isString(state) ) {
//			this._widget.el.removeClass(state);
////			this._widget.el.addClass(state_off);
//		}
		if($.isFunction(state)) {
			change_class &= (state.call(this._widget, false) !== false);			
			state = name;
		}
		
		if(change_class)
			this._widget.el.removeClass(state);		
		
		delete this._states[name];
		
		this._widget.events.fire('onStateChange', {'state': name, 'op': 'clear'});		
		this._widget.events.fire('onStateClear', {'state': name});
		
		return this;		
	},
	
	/**
	 * Переключение состояния
	 * @param {String} name имя состояния
	 * @param {Boolean} sw опциональный флаг, явно указывающий на итоговое состояние (true - включить, false - выключить)
	 */
	toggle: function(name, sw) {
		
		if(arguments.length == 1) sw = !this.is(name);
		
		sw ? this.set(name) : this.clear(name);
		
		return sw;
	},
	
	
	/**
	 * Проверка состояния
	 * @param {String} name имя состояния
	 * @returns {Boolean} активно ли состояние
	 */
	is: function(name) {
		return (name in this._states);
	}
	
	
	
});






Ergo.Statable = function() {
	this.states = new Ergo.core.StateCollection(this);
}



