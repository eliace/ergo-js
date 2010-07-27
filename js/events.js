


Dino.declare('Dino.events.Event', Dino.BaseObject, {
	
	initialize: function(overrides, baseEvent) {
		Dino.events.Event.superclass.initialize.call(this);
		
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


Dino.declare('Dino.events.CancelEvent', 'Dino.events.Event', {

	initialize: function(overrides, baseEvent) {
		Dino.events.CancelEvent.superclass.initialize.apply(this, arguments);
		this.isCanceled = false;
	},
	
	cancel: function(){
		this.isCanceled = true;
	}
	
});


/*
Dino.declare('Dino.events.HandlersTree', 'Dino.BaseObject', {
	
	initialize: function() {
		Dino.events.HandlersTree.superclass.initialize.call(this);
		this.root = {children: {}, handlers: []};
	},
	
	ensure: function(path){
		var node = this.root;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			if(!(key in node.children)) node.children[key] = {children:{}, handlers: []};
			node = node.children[key];
		}
		return node;
	},
	
	remove: function(path) {
		var node = this.root;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			if(i == path.length-1) 
				delete node.children[key];
			else
				node = node.children[key];
		}
	},
	
	get: function(path) {
		var node = this.root;
		for(var i = 0; i < path.length; i++){
			var key = path[i];
			node = node.children[key];
		}
		return node;
	},
	
	traverse: function(callback, node) {
		if(arguments.length == 1) node = this.root;
		
		callback.call(this, node);
		
		for(var i in node.children)
			traverse(callback, node.children[i]);
	}
	
	
});
*/




Dino.declare('Dino.events.Dispatcher', 'Dino.BaseObject', {
	
	initialize: function(target) {
		Dino.events.Dispatcher.superclass.initialize.apply(this, arguments);
		this.tree = new Dino.ObjectTree({}, function(){ return {handlers:[]}; }, ['handlers']);
		this.target = target;
	},
	
	/**
	 * Регистрируем событие.
	 * 
	 * reg(type, callback, target)
	 */
	reg: function(type, callback, target) {
		var node = this.tree.ensure(type);
		node.handlers.push({'callback': callback, 'target': target});
	},
	
	/**
	 * Убираем регистрацию события.
	 * 
	 * unreg(type)
	 * unreg(callback)
	 * unreg(type, callback)
	 */
	unreg: function(arg, arg2) {
		
		if(arguments.length == 2){
			var node = this.tree.get(arg);
			// с одной стороны это очень "жадный" способ удаления, а с другой - убирает некорректно зарегистрированных слушателей
			node.handlers = Dino.filter(node.handlers, Dino.ne.curry(arg2));
		}
		else if( Dino.isString(arg) ){
			this.tree.remove(arg);
		}
		else if( Dino.isFunction(arg) ){
			// с одной стороны это очень "жадный" способ удаления, а с другой - убирает некорректно зарегистрированных слушателей
			this.tree.traverse(function(node){
				node.handlers = Dino.filter(node.handlers, Dino.ne.curry(arg));
			});
		}			
				
	},
	
	/**
	 * Инициируем событие.
	 * 
	 * fire(type, event)
	 * 
	 * type - тип события в формате тип_1.тип_2 ... .тип_N
	 * 
	 */
	fire: function(type, event, baseEvent) {
		
		// "ленивая" генерация базового события
		if(arguments.length == 1) 
			event = new Dino.events.Event();
		else if( Dino.isPlainObject(event) ){
			event = new Dino.events.Event(event, baseEvent);
		}
		
		var self = this;
		
		// получаем узел указанного типа
		var node0 = this.tree.get( type );
		// обходим всех потомков и вызываем все обработчики событий
		this.tree.traverse(function(node){
			Dino.each(node.handlers, function(h){
				h.callback.call(h.target || self.target, event);
			});
		}, node0);
		
	}
	
	
});




Dino.declare('Dino.events.Observer', Dino.BaseObject, {
	
	initialize: function() {
		Dino.events.Observer.superclass.initialize.apply(this, arguments);
		this.events = new Dino.events.Dispatcher(this);
	}
	
});