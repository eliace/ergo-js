
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
		
		// Если состояние уже установлено, то ничего не делаем
		if(to && (to in this._current)) {
			deferred = $.Deferred();
			deferred.resolve();
			return deferred;			
		}
		
		
		var self = this;
		var transitions = this._transitions;
		var states = this._states;//this._widget.options.states;
		
		var from = [];
		
		// 1.
		var def = null;
		var deferred = null;
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.to == to && t.from in this._current) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
				if(result && result.done)
					deferred = deferred ? $.when(deferred, result) : $.when(result);
				
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
		
		if(from.length == 0 && def) {
			var result = def.action.call(this._widget);
			
			if(result && result.done)
				deferred = $.when(result);
		}
		


		
		
		
		
		
		//FIXME хак, если Deferred не определен
		if(deferred == null) {
			deferred = $.Deferred();
			deferred.resolve();
		}
		
		deferred.done(function() {
			
			// 2. 
			for(var i = 0; i < from.length; i++) {
				delete self._current[from[i]];
			}
			
			
			// 3.
			self.state_on(to);
			self._current[to] = from;
			self._widget.events.fire('stateChanged', {from: from, to: to});
		});
		
		return deferred;
	},
	
	
	
	state_on: function(s) {
		
		var states = this._states;//this._widget.options.states;
		
		if(s in states) {
			var val = states[s];
			if($.isString(val))
				this._widget.el.addClass(val);
			else {
				var add_cls = val.call(this._widget, true);
				if(add_cls !== false)				
					this._widget.el.addClass(s);
			}
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
			else {
//				var rm_cls = val.call(this._widget, false);
//				if(rm_cls !== false)				
					this._widget.el.removeClass(s);				
			}
		}
		else {
			this._widget.el.removeClass(s);
		}		
		
		this._widget.events.fire('stateChanged', {state: s, op: 'off'});
				
	},
	
	
	
	
	
	unset: function(from) {
		
		// Если состояние не установлено, то ничего не делаем
		if(from && !(from in this._current)) {
			deferred = $.Deferred();
			deferred.resolve();
			return deferred;			
		}
		
		var self = this;
		var transitions = this._transitions;
		var states = this._states; //this._widget.options.states;
		
		var to = [];
		
		// 1. 
		var def = null;
		var deferred = null;
		
		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.from == from && t.to) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
				if(result && result.done)
					deferred = $.when(result);
				
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
		
		if(to.length == 0 && def) {
			var result = def.action.call(this._widget);
			
			//FIXME
			if(result && result.done)
				deferred = $.when(result);
		}
		


			// 2. 
			for(var i = 0; i < to.length; i++) {
				self._current[to[i]] = [from];
				if(to[i] in states) states[to[i]].call(self._widget);
			}
			
			// 3.
			self.state_off(from);
			
			delete self._current[from];		
		

		// 3.
//		this.state_off(from);
		

		
		//FIXME хак, если Deferred не определен
		if(deferred == null) {
			deferred = $.Deferred();
			deferred.resolve();
		}
		
		
		// deferred.done(function() {
// 			
		// });
		
		
		return deferred;
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
			this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.unset('hover') });
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
				this.states.transition($.trim(a[0]), $.trim(a[1]), t);					
			}
		}
	}
	
	
}










