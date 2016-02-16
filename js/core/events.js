
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
// Ergo.defineClass('Ergo.core.Event', 'Ergo.core.Object', /** @lends Ergo.events.Event.prototype */{
//
// 	_initialize: function(baseEvent) {
// 		this.base = baseEvent;
// 		this._queue = [];
// 	},


Ergo.core.Event = function(baseEvent) {
	this.base = baseEvent;
	this._queue = [];
}

Ergo.merge(Ergo.core.Event.prototype, {

	stop: function(stopHtmlEvent) {
//		if(this.base) this.base.stopPropagation(); //FIXME
		var e = this.base;
		while(e && stopHtmlEvent !== false) {
			if(e.stopPropagation) {
				e.stopPropagation();
				break;
			}
			e = e.base;
		}
		this.stopped = true;
		// if(immediate)
		// 	this.stopedImmediate = true;
	},
	interrupt: function(interruptHtmlEvent) {
		var e = this.base;
		while(e && interruptHtmlEvent !== false) {
			if(e.stopImmediatePropagation) {
				e.stopImmediatePropagation();
				break;
			}
			e = e.base;
		}
//		if(this.base) this.base.stopImmediatePropagation(); //FIXME
		this.stopped = true;
		this.stopedImmediate = true;
	},
	yield: function(callback) {

		while(this._queue.length) {
			var h = this._queue.pop();
			h.callback.call(h.target, this);
			if(this.stopedImmediate) break;
		}

		// if( !this._yielded ) {
		// 	this._yielded = [];
		// }
		// this._yielded.push(callback);
	},
	cancel: function() {
		this.canceled = true;
	}

});


// Ergo.defineClass('Ergo.events.Event', Ergo.core.Object, /** @lends Ergo.events.Event.prototype */{
//
// 	/**
// 	 * @param {Object} overrides
// 	 * @param {Object} baseEvent
// 	 */
// 	_initialize: function(overrides, baseEvent) {
// 		this._super();
// //		Ergo.events.Event.superclass._initialize.call(this);
//
// 		if(overrides) Ergo.merge(this, overrides);
//
// //		this.is_stopped = false;
// 		this.baseEvent = baseEvent;
// 		this.canceled = false;
// 		this.stopped = false;
// 	},
//
//
// 	cancel: function(){
// 		this.canceled = true;
// 	},
//
// 	stop: function() {
// 		if(this.baseEvent) this.baseEvent.stopPropagation();
// 		this.stopped = true;
// 	}
//
//
//
// });


// Ergo.defineClass('Ergo.events.CancelEvent', 'Ergo.events.Event', /** @lends Ergo.events.CancelEvent.prototype */{
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
 * @name Ergo.core.Observer
 * @extends Ergo.core.Object
 */
// Ergo.defineClass('Ergo.core.Observer', 'Ergo.core.Object', /** @lends Ergo.core.Observer.prototype */{
//
// 	_initialize: function(target) {
// 		this.events = {};
// 		this.target = target;
// 	},


Ergo.core.Observer = function(target) {
	this.events = {};
	this.target = target;
}

Ergo.merge(Ergo.core.Observer.prototype, {



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
	fire: function(type, _event, baseEvent) {

		// "ленивая" генерация базового события
		// var _event = {
		// 	base: baseEvent,
		// 	stop: function(immediate) {
		// 		if(this.base) this.base.stopPropagation(); //FIXME
		// 		this.stopped = true;
		// 		if(immediate)
		// 			this.stopedImmediate = true;
		// 	},
		// 	interrupt: function() {
		// 		if(this.base) this.base.stopImmediatePropagation(); //FIXME
		// 		this.stopped = true;
		// 		this.stopedImmediate = true;
		// 	},
		// 	yield: function() {
		// 		this._yielded = true;
		// 	}
		// };
		var e = new Ergo.core.Event(baseEvent);

		if(arguments.length == 1) {
//			_event = new Ergo.events.Event();
//			e = new Ergo.events.Event();
		}
		else if(_event.constructor === Object) {
			$ergo.merge(e, _event);
		}
		else if(_event instanceof Ergo.core.Event) {
			e = _event;
		}
		else {
			e.$data = _event;
		}
// 		else if( _event.constructor === Object ){
// 			Ergo.merge(e, _event);
// //			_event.baseEvent = baseEvent;
// //			e = new Ergo.events.Event(e, baseEvent);
// 		}
// 		else {
// 			e = _event;
// 		}



//		var self = this;
		var h_arr = this.events[type];
		if(h_arr && h_arr.length) {

//			var yielded = [];

			e._queue = h_arr.slice();

			while(e._queue.length) {
				var h = e._queue.pop();
				h.callback.call(h.target, e, type);
				if(e.stopedImmediate) break;
			}

			// for(var i = h_arr.length-1; i >= 0; i--) {
			// 	var h = h_arr[i];
			// 	// if(e._yielded) {
			// 	// 	yielded.push(h);
			// 	// }
			// 	// else {
			// 	h.callback.call(h.target, e, type);
			// 	if(e.stopedImmediate) break;
			// 	// }
			// }
			//
			//
			// if(e._yielded) {
			// 	e._yielded.reverse().forEach(function(callback) {
			// 		callback(e);
			// 	});
			// }

			// for(var i = yielded.length-1; i >= 0; i--) {
			// 	var h = yielded[i];
			// 	h.callback.call(h.target, e, type);
			// }

// 			h_arr.forEach( function(h){
// 				// вызываем обработчик события
// 				h.callback.call(h.target, e, type);
// 				// если усьановлен флаг остановки, то прекращаем обработку событий
// //				if(e.stopped) return false;
// 			});
			// ?

			// удаляем обработчики, имеющие статус `once`
			if(this.events[type])
				this.events[type] = this.events[type].filter( function(h) { return !h.once; } );
		}

		if(e.after && !e.stopped)
			e.after.call(this.target, e, type);

//		self.on_fire(type, e, baseEvent);

		return e;
	},


	emit: function() {
		this.fire.apply(this, arguments);
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





Ergo.alias('mixins:observable', {


	get events() {
		if(!this.__evt) {
			this.__evt = new Ergo.core.Observer(this);
//			this._bindEvents();

//			var o = this.options;

		}
		return this.__evt;
	},


	// _bindShortcutEvents: function() {
	//
	//
	// },


	_bindEvents: function(targetProperty) {

		var o = this.options;

		var target = targetProperty ? this[targetProperty] : this;

		if(!target)
			throw new Error('Target property "'+targetProperty+'" not found');

		if('events' in o) {

			for(var i in o.events){

				var name_a = i.split(':');

				var eventName = i;

				if(name_a[0] == targetProperty && name_a.length > 1) {
					eventName = name_a[1];
				}
				else if(name_a.length > 1 || targetProperty) {
					// инициализируем свойство
					this[targetProperty || name_a[0]];
					continue;
				}


				var callback_a = o.events[i];
				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];

					if( typeof callback == 'string' ) {
						var a = callback.split(':');
						// action
						var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
						if( action ==  null ) {
							//TODO missed action
							callback = this._missedAction.bind(this, callback);
						}
						else {
							callback = action.bind(this, a[1]);
						}
//						callback = (a.length == 1) ? this[callback].bind(this, null) : this[a[0]]/*.rcurry(a[1])*/.bind(this, a[1]);
					}

					target.events.on(eventName, callback, this);
				}
			}
		}


		if( target == this ) {

			var regexp = /^on\S/;
			for(var i in o){
				if( i[0] == 'o' && i[1] == 'n' && regexp.test(i)){
					var name = i.charAt(2).toLowerCase() + i.slice(3);
					var chain = ( !Array.isArray(o[i]) ) ? [o[i]] : o[i];
					for(var j = 0; j < chain.length; j++) {
						var callback = chain[j];
						if( typeof callback == 'string' ) {
							var a = callback.split(':');
//							callback = (a.length == 1) ? this[callback].bind(this, null) : this[a[0]]/*.rcurry(a[1])*/.bind(this, a[1]);
							// action
							var action = $ergo.alias('actions:'+a[0]) || this[a[0]];
							if( action ==  null ) {
								//TODO missed action
								callback = this._missedAction.bind(this, callback);
							}
							else {
								callback = action.bind(this, a[1]);
							}

						}
						this.events.on( name, callback );
					}
				}
			}


		}

	},



	on: function() {
		this.events.on.apply(this.events, arguments);
	},

	once: function() {
		this.events.once.apply(this.events, arguments);
	},

	off: function() {
		this.events.off.apply(this.events, arguments);
	},

	fire: function() {
		this.events.fire.apply(this.events, arguments);
	},

	emit: function() {
		this.events.fire.apply(this.events, arguments);
	}

	// off: function(type, callback) {
	// 	var name_a = type.split(':');
	// 	var obj = this;
	// 	if(name_a.length > 1) {
	// 		obj = this[name_a[0]];
	// 		type = name_a[1];
	// 	}
	// 	obj.events.on(type, callback, this);
	// }



});






/**
 *
 * @mixin observable
 *
 */
Ergo.alias('includes:observable', {

	_construct: function(o) {

		this.events = new Ergo.core.Observer(this);

	},




	_postConstruct: function(o) {


		if('events' in o){
			for(var i in o.events){

				var name_a = i.split(':');

				// вложенные события игнорируем
				if( name_a.length > 1 ) continue;

				var callback_a = o.events[i];
				callback_a = Array.isArray(callback_a) ? callback_a : [callback_a]; //FIXME
				for(var j in callback_a) {
					var callback = callback_a[j];

					if( $.isString(callback) ) {
						var a = callback.split(':');
						callback = (a.length == 1) ? this[callback] : this[a[0]].rcurry(a[1]).bind(this);
					}

					// if( name_a.length == 2 && this[name_a[0]] && this[name_a[0]].events ) {
					// 	console.log(i);
					// 	this[name_a[0]].events.on( name_a[1], callback, this );
					// }
					// else {
					this.events.on(i, callback, this);
					// }

					// if(i.indexOf('ctx:') == 0) {
					// 	// Context
					// 	(this._context || Ergo.context).events.on(i.substr(4), callback, this);
					// }
					// else if(i.indexOf('jquery:') == 0) {
					// 	// jQuery
					// 	self.el.on(i.substr(7), callback.rcurry('jquery').bind(this));
					// }
					// else {
					// 	// Widget
					// 	this.events.on(i, callback, this);
					// }
				}
			}
		}


		var regexp = /^on\S/;
		for(var i in o){
			if( i[0] == 'o' && i[1] == 'n' && regexp.test(i)){
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
