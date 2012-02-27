
//= require "object"


/**
 * @name Ergo.events
 * @namespace
 */


/**
 * @class
 * @name Ergo.events.Event
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.events.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{
	
	/**
	 * @param {Object} overrides
	 * @param {Object} baseEvent
	 */
	initialize: function(overrides, baseEvent) {
		this.$super();
//		Ergo.events.Event.superclass.initialize.call(this);
		
		if(overrides) Ergo.override(this, overrides);
		
//		this.is_stopped = false;
		this.baseEvent = baseEvent;
	},
	
	
	cancel: function(){
		this.canceled = true;
	}
	
	
});


Ergo.declare('Ergo.events.CancelEvent', 'Ergo.events.Event', /** @lends Ergo.events.CancelEvent.prototype */{

	/**
	 * @constructs
 	 * @extends Ergo.events.Event
	 * @param {Object} overrides
	 * @param {Object} baseEvent
	 */
	initialize: function(overrides, baseEvent) {
		this.$super(overrides, baseEvent);
//		Ergo.events.CancelEvent.superclass.initialize.apply(this, arguments);
		this.isCanceled = false;
	},
	
	cancel: function(){
		this.isCanceled = true;
	}
	
});




/**
 * Диспетчер событий
 * 
 * @class
 * @name Ergo.events.Dispatcher
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.events.Dispatcher', 'Ergo.core.Object', /** @lends Ergo.events.Dispatcher.prototype */{
	
	initialize: function(target) {
		this.events = {}; 
		this.target = target;
	},
	
	/**
	 * Регистрируем событие.
	 * 
	 * reg(type, callback, target)
	 */
	reg: function(type, callback, target) {
		if(!(type in this.events)) this.events[type] = [];//new Ergo.core.Array();
		var h_arr = this.events[type];
		h_arr.push({'callback': callback, 'target': target || this.target});
		return this;
	},
	
	/**
	 * Однократная обработка события
	 */
	once: function(type, callback, target) {
		if(!(type in this.events)) this.events[type] = [];
		var h_arr = this.events[type];
		h_arr.push({'callback': callback, 'target': target || this.target, 'once': true});
		return this;
	},
	
	/**
	 * Убираем регистрацию события.
	 * 
	 * unreg(type)
	 * unreg(callback)
	 * unreg(type, callback)
	 * unreg(target)
	 */
	unreg: function(arg, arg2) {
		
		var events = this.events;
		
		if(arguments.length == 2){
			events[arg] = Ergo.filter( events[arg], function(h) { return h.callback != arg2; } );
		}
		else if( $.isString(arg) ){
			// удаляем все обработчики с данным именем
			delete events[arg];
		}
		else if( $.isFunction(arg) ){
			// удаляем указанный обработчик
			for(var i = 0; i < events.length; i++) {
				events[i] = Ergo.filter( events[i], function(h) { return h.callback != arg; } );
			}
		}
		else {
			// удаляем все обработчики для указанного объекта
			for(var i = 0; i < events.length; i++) {
				events[i] = Ergo.filter( events[i], function(h) { return h.target != arg; } );
			}
		}
		
		return this;		
	},
	
	unreg_all: function() {
		this.events = {};
	},
	
	/**
	 * Инициируем событие.
	 * 
	 * fire(type, event)
	 * 
	 * type - тип события в формате тип_1.тип_2 ... .тип_N
	 * 
	 */
	fire: function(type, e, baseEvent) {
		
		// "ленивая" генерация базового события
		if(arguments.length == 1) 
			e = new Ergo.events.Event();
		else if( $.isPlainObject(e) ){
			e = new Ergo.events.Event(e, baseEvent);
		}
		
		var self = this;
		
		var h_arr = this.events[type];
		if(h_arr) {
			Ergo.each(h_arr, function(h){
				h.callback.call(h.target, e, type);
			});
			this.events[type] = Ergo.filter( this.events[type], function(h) { return !h.once; } );
		}

		if(e.after) 
			e.after.call(this.target, e, type);

//		self.on_fire(type, e, baseEvent);
		
		return this;
	}
	
	
	// bubble: function() {
// 		
	// }
// 	
// 	
	// /**
	 // * Метод, вызываемый после отрабатывания метода fire
	 // * 
	 // */
	// on_fire: function(type, e, base_event) {
// 		
	// }
	
	
});


//Ergo.declare('Ergo.events.Dispatcher', 'Ergo.core.Object', {
//	
//	
//	/**
//	 * @constructs
//	 * @extends Ergo.core.Object
//	 * @param {Object} target
//	 */
//	initialize: function(target) {
//		Ergo.events.Dispatcher.superclass.initialize.apply(this, arguments);
//		this.tree = new Ergo.ObjectTree({}, function(){ return {handlers:[]}; }, ['handlers']);
//		this.target = target;
//	},
//	
//	/**
//	 * Регистрируем событие.
//	 * 
//	 * reg(type, callback, target)
//	 */
//	reg: function(type, callback, target) {
//		var node = this.tree.ensure(type);
//		node.handlers.push({'callback': callback, 'target': target});
//		return this;
//	},
//	
//	/**
//	 * Убираем регистрацию события.
//	 * 
//	 * unreg(type)
//	 * unreg(callback)
//	 * unreg(type, callback)
//	 * unreg(target)
//	 */
//	unreg: function(arg, arg2) {
//		
//		if(arguments.length == 2){
//			var node = this.tree.get(arg);
//			// с одной стороны это очень "жадный" способ удаления, а с другой - убирает некорректно зарегистрированных слушателей
//			node.handlers = Ergo.filter(node.handlers, Ergo.ne.curry(arg2));
//		}
//		else if( $.isString(arg) ){
//			this.tree.del(arg);
//		}
//		else if( $.isFunction(arg) ){
//			// с одной стороны это очень "жадный" способ удаления, а с другой - убирает некорректно зарегистрированных слушателей
//			this.tree.traverse(function(node){
//				node.handlers = Ergo.filter(node.handlers, Ergo.ne.curry(arg));
//			});
//		}
//		else {
//			this.tree.traverse(function(node){
//				node.handlers = Ergo.filter(node.handlers, function(h) { return (h.target != arg); });
//			});
//		}
//		
//		return this;		
//	},
//	
//	/**
//	 * Инициируем событие.
//	 * 
//	 * fire(type, event)
//	 * 
//	 * type - тип события в формате тип_1.тип_2 ... .тип_N
//	 * 
//	 */
//	fire: function(type, event, baseEvent) {
//		
//		// "ленивая" генерация базового события
//		if(arguments.length == 1) 
//			event = new Ergo.events.Event();
//		else if( $.isPlainObject(event) ){
//			event = new Ergo.events.Event(event, baseEvent);
//		}
//		
//		var self = this;
//		
//		// получаем узел указанного типа
//		var node0 = this.tree.get( type );
//		// обходим всех потомков и вызываем все обработчики событий
//		this.tree.traverse(function(node){
//			Ergo.each(node.handlers, function(h){
//				h.callback.call(h.target || self.target, event);
//			});
//		}, node0);
//		
//		return this;
//	},
//	
//	unreg_all: function(){
//		this.tree = new Ergo.ObjectTree({}, function(){ return {handlers:[]}; }, ['handlers']);		
//	}
//	
//	
//});







Ergo.Observable = function() {
	this.events = new Ergo.events.Dispatcher(this);
}


/*
Ergo.declare('Ergo.events.Observer', 'Ergo.core.Object', {
	
	initialize: function() {
		Ergo.events.Observer.superclass.initialize.apply(this, arguments);
		
		this.events = new Ergo.events.Dispatcher(this);
	}
	
});
*/