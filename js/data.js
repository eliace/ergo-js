



/*
Dino.declare('Dino.data.ArraySource', Dino.events.EventDispatcher, {
	
	initialize: function(arr) {
		this.data = arr;
		this.items = [];
	},
	
	
	get: function(i) {
		return this.data[i];
	},
	
	set: function(i, newVal) {
		var oldVal = this.data[i];
		this.data[i] = newVal;
		
		this.fireEvent('onItemChanged', {id: i, oldValue: oldVal, newValue: newVal});
		
		return oldVal;
	},

	add: function(value) {
		this.data.push(value);
		this.fireEvent('onItemAdded', {id: this.data.length-1, newValue: value});
	},
	
	val: function(newVal) {
		if(arguments.length == 0){
			return this.data;
		}
		else{
			this.data = newVal;
			this.fireEvent('onChanged', {});
		}
	}
	
	
	
});
*/



Dino.declare('Dino.data.DataSource', Dino.events.Observer, {
	
	initialize: function(src, id) {
		Dino.data.DataSource.superclass.initialize.apply(this, arguments);
		
		if(arguments.length == 1){
			this.source = {'_id': src};
			this.id = '_id';
		}
		else {
			this.source = src;
			this.id = id;
		}
		this.items = {};
	},
	
	val: function() {
		return (this.source instanceof Dino.data.DataSource) ? this.source.getValue(this.id) : this.source[this.id];
	},
	
	getValue: function(i) {
		if(arguments.length == 0)
			return this.val();
		else
			return (this.source instanceof Dino.data.DataSource) ? this.source.getItem(this.id).getValue(i) : this.source[this.id][i];
	},
	
	setValue: function(i, newValue) {
		if(arguments.length == 1) {
			for(var item in this.items){
				//TODO оповещаем все элементы, что они удалены
			}
			this.items = {};
			this.source[this.id] = newValue;
		}
		else {
			if(i in this.items)
				this.items[i].setValue(newValue);
			else
				this.source[this.id][i] = newValue;
		}
		
		this.fireEvent('onValueChanged', new Dino.events.Event());
	},
	
	eachValue: function(callback) {
		Dino.each(this.val(), callback);
	},
	
	getItem: function(i) {
		if(!(i in this.items)) {
			var item = new Dino.data.DataSource(this.val(), i);
			this.items[i] = item;
		}
		return this.items[i];
	}
	
	
});

