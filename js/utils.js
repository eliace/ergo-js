
/*
Dino.utils = (function(){
	var U = {};
	
	
	
	
	
	
	return U;
})();
*/


Dino.filters = (function(){
	
	var F = {};
	
	// "пустой" фильтр
	F.nop = function(){ return false };
	// по индексу
	F.by_index = function(index, child, i){ return index == i; };
	// по совпадению набора свойств
	F.by_props = function(props, child){
		for(var i in props)
			if(child[i] != props[i]) return false;
		return true; 
	};
		
	return F;
})();





Dino.declare('Dino.utils.WidgetStateManager', 'Dino.BaseObject', {
	
	initialize: function(widget) {
		this.widget = widget;
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
		this.widget.events.fire('onStateChanged');
		return this;
	},
	
	clear: function(name){
		var cls = this.stateCls(name);
		
		if(Dino.isArray(cls)){
			this.widget.el.addClass(cls[1]);
			cls = cls[0];
		}
		
		this.widget.el.removeClass( cls );
		this.widget.events.fire('onStateChanged');
		return this;
	},
	
	toggle: function(name, sw) {
		var cls = this.stateCls(name);
		
		if(Dino.isArray(cls)){
			this.widget.el.toggleClass( cls[1], !sw );
			cls = cls[0];
		}
		
		this.widget.el.toggleClass( cls, sw );
		this.widget.events.fire('onStateChanged');
		return this.widget.el.hasClass(cls);
	},
	
	check: function(name) {
		return this.widget.el.hasClass( this.stateCls(name) );
	},

	is: function(name) {
		return this.widget.el.hasClass( this.stateCls(name) );
	},
	
	
	stateCls: function(name) {
		return this.widget.options.states[name] || this.widget.options.baseCls+'-'+name;
	}
	
	
});




Dino.declare('Dino.utils.WidgetCollectionManager', 'Dino.BaseObject', {
	
	initialize: function(owner) {
		this.widgets = [];
		this.owner = owner;
	},
	
	
	
	add: function(item) {
		// добавляем дочерний виджет
		this.widgets.push(item);
			
		item.parent = this.owner;	
		
		// выполняем автобиндинг
		if(this.owner.data && !item.data) item.setData(this.owner.data);
		
		return item;
	},
	
	
	get: function(i) {
		var f = null;
		
		if( _dino.isNumber(i) ) return this.widgets[i]; // упрощаем
		else if( _dino.isString(i) ) f = _dino.filters.by_props.curry({'tag': i});
		else if( _dino.isFunction(i) ) f = i;
		else if( _dino.isPlainObject(i) ) f = _dino.filters.by_props.curry(i);
		else return null;
		
		return Dino.find_one(this.widgets, f);	
	},
	
	remove: function(item) {
		var i = Dino.indexOf(this.widgets, item);
		
		// если такого элемента среди дочерних нет, то возвращаем false
		if(i == -1) return false;
		
		delete this.widgets[i].parent;
		this.widgets.splice(i, 1);
		
		return true;
	},
	
	removeAll: function() {
		this.widgets = [];
	},
	
	each: function(callback) {
		for(var i = 0; i < this.widgets.length; i++)
			callback.call(this.owner, this.widgets[i], i);
	},
	
	size: function() {
		return this.widgets.length;
	}
	
	
	
});


Dino.utils.overrideOpts = function(o) {

	var ignore = ['data'];		
	
	for(var j = 1; j < arguments.length; j++){
		var newProps = arguments[j];
		for(var i in newProps){
			var p = newProps[i];
			
			if(Dino.in_array(ignore, i)){
				o[i] = p;
			}
			else{
				if( Dino.isPlainObject(p) ){
					if(!(i in o) || !Dino.isPlainObject(o[i])) o[i] = {};
					Dino.utils.overrideOpts(o[i], p);
				}
				else{
					// если элемент в перегружаемом параметре существует, то он может быть обработан специфически
					if(i in o){
						// классы сливаются в одну строку, разделенную пробелом
						if(i == 'cls') p = o[i] + ' ' + p;
					}
					o[i] = p;
				}
			}
		}
	}
	
	return o;
}




