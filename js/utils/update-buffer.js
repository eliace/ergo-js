


Dino.declare('Dino.utils.UpdateBuffer', 'Dino.core.Object', {
	
	initialize: function(o){
		Dino.utils.UpdateBuffer.superclass.initialize.apply(this, arguments);
		this.events = new Dino.events.Dispatcher(this);
		this.buffer = {};
		
		if(o) {
			if('onAdd' in o) this.events.reg('onAdd', o.onAdd);
			if('onDelete' in o) this.events.reg('onDelete', o.onDelete);
			if('onUpdate' in o) this.events.reg('onUpdate', o.onUpdate);			
		}
		
		this.id_counter = 1;
	},
	
	add: function(val) {
		// если ID не указан, то задаем временный
		if(!('id' in val)) val.id = 'temp-'+this.id_counter++;

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
	
	flush: function(callback) {
		var self = this;
		if(arguments.length > 0)
			Dino.each(this.buffer, function(item){ callback.call(self, item.value, item.event); });
		else
			Dino.each(this.buffer, function(item){ self.events.fire('on' + item.event, item); });
			
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

