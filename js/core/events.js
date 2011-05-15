
//= require "object"


/**
 * @name Dino.events
 * @namespace
 */


/**
 * @class
 * @name Dino.events.Event
 * @extends Dino.core.Object
 */
Dino.declare('Dino.events.Event', Dino.core.Object, /** @lends Dino.events.Event.prototype */{
	
	/**
	 * @param {Object} overrides
	 * @param {Object} baseEvent
	 */
	initialize: function(overrides, baseEvent) {
		Dino.events.Event.superclass.initialize.call(this);
		
		if(overrides) Dino.override(this, overrides);
		
//		this.is_stopped = false;
		this.baseEvent = baseEvent;
	}
	
});


Dino.declare('Dino.events.CancelEvent', 'Dino.events.Event', /** @lends Dino.events.CancelEvent.prototype */{

	/**
	 * @constructs
 	 * @extends Dino.events.Event
	 * @param {Object} overrides
	 * @param {Object} baseEvent
	 */
	initialize: function(overrides, baseEvent) {
		Dino.events.CancelEvent.superclass.initialize.apply(this, arguments);
		this.isCanceled = false;
	},
	
	cancel: function(){
		this.isCanceled = true;
	}
	
});




Dino.declare('Dino.events.Dispatcher', 'Dino.core.Object', {
	
	initialize: function(target) {
		this.events = {}; 
		this.target = target;
	},
	
	reg: function(type, callback, target) {
		if(!(type in this.events)) this.events[type] = [];//new Dino.core.Array();
		var h_arr = this.events[type];
		h_arr.push({'callback': callback, 'target': target || this.target});
		return this;
	},
	
	unreg: function(arg, arg2) {
		
		var events = this.events;
		
		if(arguments.length == 2){
			events[arg] = Dino.filter( events[arg], function(h) { return h.callback != arg2; } );
		}
		else if( Dino.isString(arg) ){
			// удаляем все обработчики с данным именем
			delete events[arg];
		}
		else if( Dino.isFunction(arg) ){
			// удаляем указанный обработчик
			for(var i = 0; i < events.length; i++) {
				events[i] = Dino.filter( events[i], function(h) { return h.callback != arg; } );
			}
		}
		else {
			// удаляем все обработчики для указанного объекта
			for(var i = 0; i < events.length; i++) {
				events[i] = Dino.filter( events[i], function(h) { return h.target != arg; } );
			}
		}
		
		return this;		
	},
	
	unreg_all: function() {
		this.events = {};
	},
	
	fire: function(type, e, baseEvent) {
		
		// "ленивая" генерация базового события
		if(arguments.length == 1) 
			e = new Dino.events.Event();
		else if( Dino.isPlainObject(e) ){
			e = new Dino.events.Event(e, baseEvent);
		}
		
//		var self = this;
		
		var h_arr = this.events[type];
		if(h_arr) {
			Dino.each(h_arr, function(h){
				h.callback.call(h.target, e);
			});			
		}
		
		return this;
	}
	
	
});


//Dino.declare('Dino.events.Dispatcher', 'Dino.core.Object', {
//	
//	
//	/**
//	 * @constructs
//	 * @extends Dino.core.Object
//	 * @param {Object} target
//	 */
//	initialize: function(target) {
//		Dino.events.Dispatcher.superclass.initialize.apply(this, arguments);
//		this.tree = new Dino.ObjectTree({}, function(){ return {handlers:[]}; }, ['handlers']);
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
//			node.handlers = Dino.filter(node.handlers, Dino.ne.curry(arg2));
//		}
//		else if( Dino.isString(arg) ){
//			this.tree.del(arg);
//		}
//		else if( Dino.isFunction(arg) ){
//			// с одной стороны это очень "жадный" способ удаления, а с другой - убирает некорректно зарегистрированных слушателей
//			this.tree.traverse(function(node){
//				node.handlers = Dino.filter(node.handlers, Dino.ne.curry(arg));
//			});
//		}
//		else {
//			this.tree.traverse(function(node){
//				node.handlers = Dino.filter(node.handlers, function(h) { return (h.target != arg); });
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
//			event = new Dino.events.Event();
//		else if( Dino.isPlainObject(event) ){
//			event = new Dino.events.Event(event, baseEvent);
//		}
//		
//		var self = this;
//		
//		// получаем узел указанного типа
//		var node0 = this.tree.get( type );
//		// обходим всех потомков и вызываем все обработчики событий
//		this.tree.traverse(function(node){
//			Dino.each(node.handlers, function(h){
//				h.callback.call(h.target || self.target, event);
//			});
//		}, node0);
//		
//		return this;
//	},
//	
//	unreg_all: function(){
//		this.tree = new Dino.ObjectTree({}, function(){ return {handlers:[]}; }, ['handlers']);		
//	}
//	
//	
//});







Dino.Observable = function() {
	this.events = new Dino.events.Dispatcher(this);
}


/*
Dino.declare('Dino.events.Observer', 'Dino.core.Object', {
	
	initialize: function() {
		Dino.events.Observer.superclass.initialize.apply(this, arguments);
		
		this.events = new Dino.events.Dispatcher(this);
	}
	
});
*/