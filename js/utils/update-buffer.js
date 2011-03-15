


Dino.declare('Dino.utils.UpdateBuffer', 'Dino.events.Observer', {
	
	initialize: function(o){
		Dino.utils.UpdateBuffer.superclass.initialize.apply(this, arguments);
		this.buffer = {};
		
		if(o) {
			if('onAdd' in o) this.events.reg('onAdd', o.onAdd);
			if('onDelete' in o) this.events.reg('onDelete', o.onDelete);
			if('onUpdate' in o) this.events.reg('onUpdate', o.onUpdate);			
		}
		
	},
	
	add: function(val) {
		this.buffer[val.id] = {event: 'Add', value: val};
	},

	upd: function(val) {
		if(val.id in this.buffer)
			this.buffer[val.id].value = val;
		else
			this.buffer[val.id] = {event: 'Update', value: val};			
	},
	
	del: function(val) {
		this.buffer[val.id] = {event: 'Delete', value: val}
	},
	
	flush: function() {
		for(var i in this.buffer)
			this.events.fire('on' + item.event, this.buffer[i]);
		this.clear();
	},
	
	clear: function() {
		this.buffer = {};		
	},
	
	each: function(callback) {
		for (var i in this.buffer) {
			var item = this.buffer[i];
			callback.call(this, item.value, item.event);
		}		
	}
	
});
