
//= require "events"




Ergo.declare('Ergo.core.StateManager', 'Ergo.core.Object', {
	
	
	initialize: function(widget) {
		this._widget = widget;
		this._current = {};
		this._states = {};
		this._transitions = [];
	},
	
	
	transition: function(from, to, value) {
		
		var t = this._transitions;
//		var s = name.replace(/\s/g, '');
//		if(!t[from]) t[from] = {};
//		t[from][to] = value;
		t.push({
			from: from,
			to: to,
			action: value
		});
		
	},
	
	
	state: function(name, value) {
		this._states[name] = value;
	},
	
	
	set: function(to) {
		
		var transitions = this._transitions;
		var states = this._states;//this._widget.options.states;
		
		var from = [];
		
		// 1.
		var def = null;
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.to == to && t.from in this._current) {
				t.action.call(this._widget);
				from.push(t.from);
			}
			else if(t.to == to && !t.from){
				def = t;
			}
		} 
		// for(var i in this._current) {
			// if(i in transitions && to in transitions[i]) {
				// transitions[i][to].call(this._widget);
				// from.push(i);
			// }
		// }
		
		if(from.length == 0 && def)
			def.action.call(this._widget);
		

		// 2. 
		for(var i = 0; i < from.length; i++) {
			delete this._current[from[i]];
		}

		// 3.		
		this.state_on(to);
		
		this._current[to] = from;
		
		
		this._widget.events.fire('stateChanged', {from: from, to: to});
		
		return this;
	},
	
	
	
	state_on: function(s) {
		
		var states = this._states;//this._widget.options.states;
		
		if(s in states) {
			var val = states[s];
			if($.isString(val))
				this._widget.el.addClass(val);
			else
				val.call(this._widget);
		}
		else {
			this._widget.el.addClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'on'});		
	},
	
	
	state_off: function(s) {

		var states = this._states;//this._widget.options.states;
		
		if(s in states) {
			var val = states[s];
			if($.isString(val))
				this._widget.el.removeClass(val);
		}
		else {
			this._widget.el.removeClass(s);
		}		
		
		this._widget.events.fire('stateChanged', {state: s, op: 'off'});
				
	},
	
	
	
	
	
	unset: function(from) {
		
		
		var transitions = this._transitions;
		var states = this._states; //this._widget.options.states;
		
		var to = [];
		
		// 1. 
		var def = null;
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.from == from && t.to) {
				t.action.call(this._widget);
				to.push(t.to);
			}
			else if(t.from == from && !t.to) {
				def = t;
			}
		}
		// for(var i in transitions[from]) {
			// transitions[from][i].call(this._widget);
			// to.push(i);
		// }
		
		if(to.length == 0 && def)
			def.action.call(this._widget);
		
		
		// 2. 
		for(var i = 0; i < to.length; i++) {
			this._current[to[i]] = [from];
			if(to[i] in states) states[to[i]].call(this._widget);
		}

		// 3.
		this.state_off(from);
		
		delete this._current[from];		
		
		return this;
	},
	
	
	toggle: function(name, sw) {
		
		if(arguments.length == 1) sw = !this.is(name);
		
		sw ? this.set(name) : this.unset(name);

		return this;
	},
	
	only: function(name, unset_template) {

		var states_to_unset = [];

		if(unset_template) {
			if($.isString(unset_template))
				unset_template = new RegExp('^'+unset_template+'.*$');
			
			for(var i in this._current)
				if(i.match(unset_template)) states_to_unset.push(i);
		}
		else {
			for(var i in this._current)
				if(i != name) states_to_unset.push(i);
		}

		// очищаем состояния, выбранные для удаления
		for(var i = 0; i < states_to_unset.length; i++) 
			this.unset(states_to_unset[i]);

		// если состояние еще не установлено, то устанавливаем его
		if(!this.is(name))
			this.set(name);	
		
		return this;		
	},	
	
	clear: function() {
		this._current = {};
		return this;
	},
	
	is: function(name) {
		return (name in this._current);
	}
	
	
	
});







/**
 * @class
 * @name Ergo.core.StateCollection
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.core.StateCollection', 'Ergo.core.Object', /** @lends Ergo.core.StateCollection.prototype */ {
	
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
		
		
		// если имя состояния является регулярным выражением, то устанавливаем все
		// состояния, которые подходят под это регулярное выражение
		if(name instanceof RegExp) {
			var names = Ergo.filter(this._states, function(s, i){ return i.match(name); });
			for(var i in names) this.set(i);
			return this;
		}
		
		
		
		// получаем состояние, определенное для виджета
		var state = this._widget.options.states[name];
//		var state_off, state_on = null;
		if(state == null) state = name;//{ state_on = name; state_off = ''; }

/*		
//		else if($.isString(state)) { state_on = state; state_off = ''; }
		else if($.isArray(state)) { //{ state_on = state[0]; state_off = state[1]; }
			this.set(state[0]);
			this.clear(state[1]);
			this._states[name] = true;
			return this;
		}
*/
		
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
			
			self._widget.events.fire('stateChanged', {'state': name, 'op': 'set'});
			self._widget.events.fire('stateSet', {'state': name});			
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

		
		// если имя состояния является регулярным выражением, то устанавливаем все
		// состояния, которые подходят под это регулярное выражение
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
		
/*		
//		else if($.isString(state)) { state_on = state; state_off = ''; }
		else if($.isArray(state)) {//{ state_on = state[0]; state_off = state[1]; }
			this.clear(state[0]);
			this.set(state[1]);
			delete this._states[name];
			return this;
		}
*/		
		
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
		
		this._widget.events.fire('stateChanged', {'state': name, 'op': 'clear'});		
		this._widget.events.fire('stateClear', {'state': name});
		
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
	this.states = new Ergo.core.StateManager(this);
}







Ergo.stateFn = function() {

	var fn = function(on) {
		var s = this.states;
		for(var i in fn._on) s.toggle(fn._on[i], on);
		for(var i in fn._off) s.toggle(fn._off[i], !on);
	};
	
	fn._on = [];
	fn._off = [];	
	
	fn.on = function(){
		for(var i = 0; i < arguments.length; i++)
			this._on.push(arguments[i]);		
		return this;
	}
	
	fn.off = function(){
		for(var i = 0; i < arguments.length; i++)
			this._off.push(arguments[i]);
		return this;		
	}
	
	return fn;
};

Ergo.on = function() {
	var f = Ergo.stateFn();
	return f.on.apply(f, arguments);
};

Ergo.off = function() {
	var f = Ergo.stateFn();
	return f.off.apply(f, arguments);
};




