


Dino.declare('Dino.events.Event', Dino.BaseObject, {
	
	_initialize: function(overrides, baseEvent) {
		Dino.events.Event.superclass._initialize.call(this);
		
		if(overrides) Dino.override(this, overrides);
		
//		this.is_stopped = false;
		this.baseEvent = baseEvent;
	}
	
//	preventDefault: function() {
//		if(this.baseEvent && this.baseEvent.preventDefault)
//			this.baseEvent.preventDefault();
//		this.is_stopped = true;
//	}
	
});



Dino.declare('Dino.events.EventDispatcher', Dino.BaseObject, {
	
	_initialize: function() {
		Dino.events.EventDispatcher.superclass._initialize.apply(this, arguments);
		this.handlers = {};
	},
	
	/**
	 * Регистрируем событие.
	 * 
	 * addEvent(type, callback, target)
	 */
	addEvent: function(type, callback, target) {
		var a = this.handlers[type] || [];
		a.push({'callback': callback, 'target': target});
		this.handlers[type] = a;		
	},
	
	/**
	 * Убираем регистрацию события.
	 * 
	 * removeEvent(type)
	 * removeEvent(callback)
	 * removeEvent(type, callback, target)
	 */
	removeEvent: function(type, callback, target) {
		if(arguments.length == 1){
			if($.isString(type)){
				this.handlers[type] = [];
			}
			else if($.isFunction(type)){
				callback = type;
				for(var i in this.handlers){
					this.handlers[i] = Dino.select(this.handlers[i], function(item) { return item.callback != callback; });
				}
			}
		}
		else{
			if(target){
				this.handlers[type] = Dino.select(this.handlers[type], function(item){ return item.callback != callback; });
			}
			else{
				this.handlers[type] = Dino.select(this.handlers[type], function(item){ return  item.callback != callback || item.target != target; });
			}
		}
	},
	
	/**
	 * Инициируем событие.
	 * 
	 * fireEvent(type, event)
	 * 
	 * type - тип события в формате тип_1.тип_2 ... .тип_N
	 * 
	 */
	fireEvent: function(type, event) {
		var type_a = type.split('.');
		var self = this;
		Dino.each(type_a, function(i, t){
			Dino.each(self.handlers[t], function(i, h) { h.callback.call(h.target || self, event); });
		});
	}
	
	
	
});