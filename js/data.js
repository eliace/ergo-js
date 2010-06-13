




Dino.declare('Dino.data.ArraySource', Dino.EventDispatcher, {
	
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
		
		this.fireEvent('onItemChanged', {});
		
		return oldVal;
	},

	add: function(value) {
		this.data.push(value);
		this.fireEvent('onItemAdded', {});
	}
	
	val: function(newVal) {
		if(arguments.length == 0){
			return this.data;
		}
		else{
			this.data = newVal;
			this.fireEvent('onChanged', {});
		}
	},
	
/*	
	item: function(i) {
		var item = this.items[i];
		if(!item){
			item = (Dino.isArray(this.data[i])) ? new Dino.data.ArraySource(this.data[i]) : new Dino.data.ObjectSource(this.data[i]);
			this.items[i] = 
		}
		return item;
	}
*/	
	
	
	
});