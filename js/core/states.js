

Dino.declare('Dino.events.StateEvent', 'Dino.events.Event', {

	initialize: function(method, args) {
		Dino.events.StateEvent.superclass.initialize.call(this, {'method': method, 'args': args});
	},
	
	translate: function(target, filter){
		if(arguments.length == 1 || Dino.in_array(filter, this.args[0]))
			target.states[this.method].apply(target.states, this.args);
	}
	
});



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

