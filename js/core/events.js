
//= require object


/**
 * @name Ergo.events
 * @namespace
 */


/**
 * 
 * @deprecated
 * 
 * @class
 * @name Ergo.events.Event
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.events.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{
	
	/**
	 * @param {Object} overrides
	 * @param {Object} baseEvent
	 */
	_initialize: function(overrides, baseEvent) {
		this._super();
//		Ergo.events.Event.superclass._initialize.call(this);
		
		if(overrides) Ergo.override(this, overrides);
		
//		this.is_stopped = false;
		this.baseEvent = baseEvent;
		this.canceled = false;
		this.stopped = false;
	},
	
	
	cancel: function(){
		this.canceled = true;
	},
	
	stop: function() {
		if(this.baseEvent) this.baseEvent.stopPropagation();
		this.stopped = true;
	}
	
	
	
});


// Ergo.declare('Ergo.events.CancelEvent', 'Ergo.events.Event', /** @lends Ergo.events.CancelEvent.prototype */{
// 
	// /**
	 // * @constructs
 	 // * @extends Ergo.events.Event
	 // * @param {Object} overrides
	 // * @param {Object} baseEvent
	 // */
	// _initialize: function(overrides, baseEvent) {
		// this._super(overrides, baseEvent);
// //		Ergo.events.CancelEvent.superclass._initialize.apply(this, arguments);
		// this.isCanceled = false;
	// },
// 	
	// cancel: function(){
		// this.isCanceled = true;
	// }
// 	
// });




/**
 * Диспетчер событий
 * 
 * @class
 * @name Ergo.events.Dispatcher
 * @extends Ergo.core.Object
 */
Ergo.declare('Ergo.events.Observer', 'Ergo.core.Object', /** @lends Ergo.events.Dispatcher.prototype */{
	
	_initialize: function(target) {
		this.events = {}; 
		this.target = target;
	},
	
	/**
	 * Регистрируем событие.
	 * 
	 * on(type, callback, target)
	 */
	on: function(type, callback, target) {
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
	 * off(type)
	 * off(callback)
	 * off(type, callback)
	 * off(target)
	 * off();
	 */
	off: function(arg, arg2) {
		
		var events = this.events;
		
		if(arguments.length == 0) {
			this.events = {};
		}
		else if(arguments.length == 2){
			events[arg] = events[arg].filter( function(h) { return h.callback != arg2; } );
		}
		else if( $.isString(arg) ){
			// удаляем все обработчики с данным именем
			delete events[arg];
		}
		else if( $.isFunction(arg) ){
			// удаляем указанный обработчик
//			for(var i = 0; i < events.length; i++) {
			for(var i in events) {
				events[i] = events[i].filter( function(h) { return h.callback != arg; } );
			}
		}
		else {
			// удаляем все обработчики для указанного объекта
//			for(var i = 0; i < e.length; i++) {
			for(var i in events) {
				events[i] = events[i].filter( function(h) { return h.target != arg; } );
			}
		}
		
		return this;		
	},
	
	// unreg_all: function() {
	// 	this.events = {};
	// },
	
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
		var _event = {
			base: baseEvent,
			stop: function(immediate) {
				if(this.base) this.base.stopPropagation(); //FIXME
				this.stopped = true;
				if(immediate)
					this.stopedImmediate = true;
			}
		};
		
		if(arguments.length == 1) { 
//			_event = new Ergo.events.Event();
//			e = new Ergo.events.Event();
		}
		else if( $.isPlainObject(e) ){
			Ergo.override(_event, e);
//			_event.baseEvent = baseEvent;
//			e = new Ergo.events.Event(e, baseEvent);
		}
		
		e = _event;
		
		
//		var self = this;
		
		var h_arr = this.events[type];
		if(h_arr && h_arr.length) {
			for(var i = h_arr.length-1; i >= 0; i--) {
				var h = h_arr[i];
				h.callback.call(h.target, e, type);
				if(e.stopedImmediate) break;
			}		
// 			h_arr.forEach( function(h){
// 				// вызываем обработчик события
// 				h.callback.call(h.target, e, type);
// 				// если усьановлен флаг остановки, то прекращаем обработку событий
// //				if(e.stopped) return false;
// 			});
			// ?
			if(this.events[type])
				this.events[type] = this.events[type].filter( function(h) { return !h.once; } );
		}

		if(e.after && !e.stopped)
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





/**
 * 
 * @mixin
 * 
 */
Ergo.alias('includes:observable', {

	_construct: function(o) {
	
		this.events = new Ergo.events.Observer(this);
				
	},
	
	
	_post_construct: function(o) {
		
		var regexp = /^on\S/;
		for(var i in o){
			if(regexp.test(i)){
				var name = i.charAt(2).toLowerCase() + i.slice(3);
				var chain = ( !Array.isArray(o[i]) ) ? [o[i]] : o[i];
				for(var j = 0; j < chain.length; j++) {
					var callback = chain[j];
					if( $.isString(callback) ) {
						var a = callback.split(':');						
						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
					}
					this.events.on( name, callback );
				}
			}
		}
		
	} 

});