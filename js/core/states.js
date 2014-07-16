
//= require "events"




Ergo.declare('Ergo.core.StateManager', 'Ergo.core.Object', {
	
	
	initialize: function(widget) {
		this._widget = widget;
		this._current = {};
		this._states = {};
		this._transitions = [];
		this._exclusives = {};
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
	
	
	exclusive: function(name, g) {
		
		var excl_template = new RegExp('^'+name+'.*$');

		var group = this._exclusives[g];
		if(!group) group = [];
		this._exclusives[g] = group;
		
		group.push(excl_template);		
	},
	
	exclusive_group: function(g, exclusives) {		
		for(var i = 0; i < exclusives.length; i++)
			this.exclusive(exclusives[i], g);
	},
	
	
	
	state: function(name, value) {
		
		// парсим код состояния
		var i = name.indexOf(':');
		if( i == 0 ) {
			var g = name.substr(1);
			this.exclusive_group(g, value);
		}
		else {
			if( i > 0 ) {
				var g = name.substr(i+1);
				name = name.substr(0, i);
				
				this.exclusive(name, g);
			}
		
			this._states[name] = value;
		}
	},
	
	
	set: function(to) {
		
		// Если состояние уже установлено, то ничего не делаем
		if(to && (to in this._current))
			return $.when({});

		
		
		var self = this;
		var transitions = this._transitions;
		var states = this._states;//this._widget.options.states;
		
		var from = [];
		
		// 1.
		var def = null;
		var deferreds = [];
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.to == to && t.from in this._current) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
				deferreds.push(result);
//					deferred = deferred ? $.when(deferred, result) : $.when(result);
				
				from.push(t.from);
			}
			else if(t.to == to && t.from == '*'){
				def = t;
			}
		} 
		// for(var i in this._current) {
			// if(i in transitions && to in transitions[i]) {
				// transitions[i][to].call(this._widget);
				// from.push(i);
			// }
		// }
		
		for(var g in this._exclusives) {
			if( this._is_exclusive(to, g) ) {
				
				for(var i in this._current)
					if(this._is_exclusive(i, g))
						this.unset(i);
				
			}			
		}
		
		
		
		
		
		if(from.length == 0 && def) {
			var result = def.action.call(this._widget);
			
//			if(result && result.done)
			deferreds.push(result);
//				deferred = $.when(result);
		}
		


		
		
		// if(deferreds.length == 0)
			// deferreds.push({});
		
		
		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }		
		
		
		
		return $.when.apply($, deferreds).done(function() {
			
			// 2. удаляем все исходные состояния переходов из списка активных состояний
			for(var i = 0; i < from.length; i++) {
				delete self._current[from[i]];
			}			
			
			// 3. включаем итоговое состояние
			self._state_on(to);
			self._current[to] = from;
			
			// 4. оповещаем виджет, что состояние изменилось
			self._widget.events.fire('stateChanged', {from: from, to: to});
		});
		
//		return deferred;
	},
	
	
	
	_state_on: function(s) {
		
		var self = this;
		var states = this._states;//this._widget.options.states;
		
		if(s in states) {
			var val = states[s];
			
			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if($.isString(val))
				this._widget.el.addClass(val);
			// если состояние определено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if($.isArray(val)) {
				if(val.length > 0) {
					$.when( val[0].call(this._widget, true) ).done(function(add_cls) {
						if(add_cls !== false)				
							self._widget.el.addClass(add_cls || s);					
					});
				}
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				$.when( val.call(this._widget, true) ).done(function(add_cls) {
					if(add_cls !== false)				
						self._widget.el.addClass(add_cls || s);					
				});
			}
		}
		else {
			this._widget.el.addClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'on'});		
	},
	
	
	
	
	
	_state_off: function(s) {

		var self = this;
		var states = this._states;//this._widget.options.states;
		
		if(s in states) {
			var val = states[s];
			
			// если состояние определено строкой, то строка содержит имя устанавливаемого класса			
			if($.isString(val))
				this._widget.el.removeClass(val);
			// если состояние опрелено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if($.isArray(val)) {
				if(val.length > 1) {
					$.when( val[1].call(this._widget, false) ).done(function(rm_cls) {
						if(rm_cls !== false)
							self._widget.el.removeClass(rm_cls || s);					
					});					
				}
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				$.when( val.call(this._widget, false) ).done(function(rm_cls) {
					if(rm_cls !== false)				
						self._widget.el.removeClass(rm_cls || s);
				});
				
//				var rm_cls = val.call(this._widget, false);
//				if(rm_cls !== false)				
//					this._widget.el.removeClass(s);				
			}
		}
		else {
			this._widget.el.removeClass(s);
		}		
		
		this._widget.events.fire('stateChanged', {state: s, op: 'off'});
				
	},
	
	
	
	_is_exclusive: function(s, g) {
		
		var group = this._exclusives[g];
		
		for(var i = 0; i < group.length; i++) {
			if(s.match(group[i])) return true;
		}
		
		return false;
	},

	
	unset: function(from) {
		
		// Если состояние не установлено, то ничего не делаем
		if(from && !(from in this._current)) {
			return $.when({});			
		}
		
		var self = this;
		var transitions = this._transitions;
		var states = this._states; //this._widget.options.states;
		
		var to = [];
		
		// 1. Вызываем 
		var def = null;
		var deferreds = [];
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.from == from && t.to) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
//					deferred = $.when(result);
				deferreds.push(result);
				
				to.push(t.to);
			}
			else if(t.from == from && t.to == '*') {
				def = t;
			}
		}
		// for(var i in transitions[from]) {
			// transitions[from][i].call(this._widget);
			// to.push(i);
		// }
		
		if(to.length == 0 && def) {
			var result = def.action.call(this._widget);
			
			deferreds.push(result);
			// //FIXME
			// if(result && result.done)
				// deferred = $.when(result);
		}
		


		// 2. 
		for(var i = 0; i < to.length; i++) {
			self._current[to[i]] = [from];
			if(to[i] in states) self._state_on(to[i]); //states[to[i]].call(self._widget);
		}
		
		// 3.
		self._state_off(from);
		
		delete self._current[from];		
		

		// 3.
//		this.state_off(from);
		

		
		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }
		
		
		// deferred.done(function() {
// 			
		// });
		
		
//		return deferred;
		return $.when.apply($, deferreds);
	},
	
	
	toggle: function(name, sw) {
		
		if(arguments.length == 1) sw = !this.is(name);
		
		sw ? this.set(name) : this.unset(name);

		return this;
	},
	
	only: function(name, unset_template) {

		var states_to_unset = [];

		if(unset_template) {
			
			if($.isArray(unset_template))
				states_to_unset = unset_template;
			else {
				if($.isString(unset_template))
					unset_template = new RegExp('^'+unset_template+'.*$');
				
				for(var i in this._current)
					if(i.match(unset_template)) states_to_unset.push(i);				
			}
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












Ergo.Statable = function(o) {
	this.states = new Ergo.core.StateManager(this);
	
//	var o = this.options;
	var self = this;
	
	if('states' in o){
		for(var i in o.states)
			this.states.state(i, o.states[i]);
		// настраиваем особое поведение состояния hover
		if('hover' in o.states){
			this.el.hover(function(){ self.states.set('hover'); }, function(){ self.states.unset('hover'); });
		}
	}
	
	if('transitions' in o) {
		for(var i in o.transitions) {
			var t = o.transitions[i];
			if($.isPlainObject(t)) {
				//TODO
			}
			else {
				var a = i.split('>');
				if(a.length == 1) a.push('');
				this.states.transition($.trim(a[0]) || '*', $.trim(a[1]) || '*', t);					
			}
		}
	}
	
	// // генерируем сеттеры и геттеры
	// for(var i in this._exclusives) {
// 		
	// }
	
	
	
	
	// if('exclusives' in o) {
		// for(var i in o.exclusives) {
			// this.states.exclusive_group(i, o.exclusives[i]);//excl_template);
		// }
	// }
	
	
};










