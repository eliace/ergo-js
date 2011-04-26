
/*
Dino.declare('Dino.events.StateEvent', 'Dino.events.Event', {

	initialize: function(method, args) {
		Dino.events.StateEvent.superclass.initialize.call(this, {'method': method, 'args': args});
	},
	
	translate: function(target, filter){
		if(arguments.length == 1 || Dino.in_array(filter, this.args[0]))
			target.states[this.method].apply(target.states, this.args);
	}
	
});
*/



/**
 * @class
 */
Dino.StateCollection = Dino.declare('Dino.StateCollection', 'Dino.BaseObject', /** @lends Dino.StateManager.prototype */ {
	
	initialize: function(widget) {
		this.widget = widget;
		this.current_states = {};
	},
	
	/**
	 * Активация состояния
	 * @param {String} name имя состояния
	 */
	set: function(name, change_class) {
		
		// получаем состояние, определенное для виджета
		var state = this.widget.options.states[name];
//		var state_off, state_on = null;
		if(state == null) state = name;//{ state_on = name; state_off = ''; }
//		else if(Dino.isString(state)) { state_on = state; state_off = ''; }
		else if(Dino.isArray(state)) { //{ state_on = state[0]; state_off = state[1]; }
			this.set(state[0]);
			this.clear(state[1]);
			this.current_states[name] = true;
			return this;
		}
		
//		if( Dino.isString(state) ) {
//			this.widget.el.addClass(state);
//			this.widget.el.removeClass(state_off);
//		}

		if(arguments.length == 1) change_class = true;
		
		if(Dino.isFunction(state)) {
			change_class &= (state.call(this.widget, true) !== false);
			state = name;
		}
		
		if(change_class)
			this.widget.el.addClass(state);
		
		this.current_states[name] = true;
		
		this.widget.events.fire('onStateChange', {'state': name, 'op': 'set'});
		this.widget.events.fire('onStateSet', {'state': name});
		
		return this;
	},
	
	/**
	 * Активация указанного состояния и отключение всех остальных состояний
	 * @param {String} name
	 */
	setOnly: function(name) {
		for(var i in this.current_states) this.clear(i);
		this.set(name);	
		
		return this;		
	},
	
	/**
	 * Дезактивация состояния
	 * @param {String} name имя состояния
	 */
	clear: function(name) {
		
		if(name instanceof RegExp) {
			var names = Dino.filter(this.current_states, function(s, i){ return i.match(name); });
			for(var i in names) this.clear(i);
			return this;			
		}

//		// если указанное состояние не определено, то очистку не выполняем
//		if(!(name in this.current_states)) return this;
		
		// получаем состояние, определенное для виджета
		var state = this.widget.options.states[name];		
//		var state_off, state_on = null;
		if(state == null) state = name;//{ state_on = name; state_off = ''; }
//		else if(Dino.isString(state)) { state_on = state; state_off = ''; }
		else if(Dino.isArray(state)) {//{ state_on = state[0]; state_off = state[1]; }
			this.clear(state[0]);
			this.set(state[1]);
			delete this.current_states[name];
			return this;
		}
		
		
		var change_class = true;

//		if( Dino.isString(state) ) {
//			this.widget.el.removeClass(state);
////			this.widget.el.addClass(state_off);
//		}
		if(Dino.isFunction(state)) {
			change_class &= (state.call(this.widget, false) !== false);			
			state = name;
		}
		
		if(change_class)
			this.widget.el.removeClass(state);		
		
		delete this.current_states[name];
		
		this.widget.events.fire('onStateChange', {'state': name, 'op': 'clear'});		
		this.widget.events.fire('onStateClear', {'state': name});
		
		return this;		
	},
	
	/**
	 * Переключение состояния
	 * @param {String} name имя состояния
	 * @param {Boolean} sw опциональный флаг, явно указывающий на итоговое состояние (true - включить, false - выключить)
	 */
	toggle: function(name, sw) {
		
		if(sw == null) sw = !this.is(name);
		
		sw ? this.set(name) : this.clear(name);
		
		return sw;
	},
	
	
	/**
	 * Проверка состояния
	 * @param {String} name имя состояния
	 * @returns {Boolean} активно ли состояние
	 */
	is: function(name) {
		return (name in this.current_states);
	}
	
	
	
});




/*
Dino.declare('Dino.utils.WidgetStateManager', 'Dino.BaseObject', {
	
//	defaultOptions: {
//		multistate: true
//	},
	
	initialize: function(widget) {
		this.widget = widget;
//		this.options = Dino.utils.deep_override({}, this.defaultOptions, o);
		this.current_states = {};
//		this.multistate = true;
	},
	
	set_only: function(name) {
		for(var i in this.current_states) this.clear(i);
		this.set(name);
	},
	
	set: function(name) {
		
		// получаем класс или массив
		var cls = this.stateCls(name);
		// если состояние - массив, то второй элемент содержит классы, которые нужно убрать
		if(Dino.isArray(cls)){
			this.widget.el.removeClass(cls[1]);
			cls = cls[0];
		}
		// добавляем класс текущего состояния
		this.widget.el.addClass(cls);
		this.widget.events.fire('onStateChanged', new Dino.events.StateEvent('set', arguments));
		
		// запоминаем установленное состояние
		this.current_states[name] = true;
		
		return this;
	},
	
	clear: function(name){
		var cls = this.stateCls(name);
		
		if(Dino.isArray(cls)){
			this.widget.el.addClass(cls[1]);
			cls = cls[0];
		}
		
		this.widget.el.removeClass( cls );
		this.widget.events.fire('onStateChanged', new Dino.events.StateEvent('clear', arguments));
		
		delete this.current_states[name];
		
		return this;
	},
	
	toggle: function(name, sw) {
		var cls = this.stateCls(name);
		
		if(Dino.isArray(cls)){
			if(arguments.length == 1)
				this.widget.el.toggleClass( cls[1] );
			else
				this.widget.el.toggleClass( cls[1], !sw );
			cls = cls[0];
		}
		
		this.widget.el.toggleClass( cls, sw );
		this.widget.events.fire('onStateChanged', new Dino.events.StateEvent('toggle', arguments));
		
		(name in this.current_states) ? delete this.current_states[name] : this.current_states[name] = true;
		
		return this.widget.el.hasClass(cls);
	},
	
	check: function(name) {
//		var cls = this.stateCls(name);
//		if(Dino.isArray(cls))
//			return (cls[0] == '' || this.widget.el.hasClass(cls[0])) && !this.widget.el.hasClass(cls[1])
//		return this.widget.el.hasClass( cls );
		return this.is(name);
	},

	is: function(name) {
		var cls = this.stateCls(name);
		if(Dino.isArray(cls))
			return (cls[0] == '' || this.widget.el.hasClass(cls[0])) && !this.widget.el.hasClass(cls[1])
		return this.widget.el.hasClass( cls );
	},
	
	
	stateCls: function(name) {
		var stateVal = this.widget.options.states[name];
		// если состояние не определено, то формируем имя класса по имени базового класса
		if(stateVal === undefined) return name;
		// если состояние - функция, то вызываем ее, а значение считаем состоянием
		if(Dino.isFunction(stateVal))
			return stateVal.call(this.widget);
		
		return stateVal;
	}
	
	
});
*/
