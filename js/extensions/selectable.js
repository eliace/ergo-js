



Dino.SelectionManager = Dino.declare('Dino.SelectionManager', 'Dino.BaseObject', {
	
	initialize: function(widget) {
		Dino.SelectionManager.superclass.initialize.apply(this, arguments);
		
		this.widget = widget
		this.selection_a = [];
		
	},
	
	get: function() {
		return this.selection_a[0];
	},
	
	get_all: function() {
		return this.selection_a;		
	},
	
	add: function(w, ctrlKey, shiftKey) {
		
    if(shiftKey && this.selection_a.length > 0) {
      // создаем выборку
      var i0 = Math.min(this.selection_a[0].index, this.selection_a[this.selection_a.length-1].index);
      i0 = Math.min(i0, w.index);
      var i1 = Math.max(this.selection_a[0].index, this.selection_a[this.selection_a.length-1].index);
      i1 = Math.max(i1, w.index);
      
      this.selection_a = [];
      
			var self = this;
			
      w.parent.eachItem(function(item, i){
        if(i >= i0 && i <= i1) {
          item.states.set('selected');
          self.selection_a.push(item);
        }
      });
    }
    else if(ctrlKey) {
      ( w.states.toggle('selected') ) ? this.selection_a.push(w) : Dino.remove_from_array(this.selection_a, w);
    }
    else {
      if(this.selection_a)
        Dino.each(this.selection_a, function(item){ item.states.clear('selected'); });
      w.states.set('selected');
      this.selection_a = [w];                  
    }
    
		this.widget.events.fire('onSelectionChanged');
		
	},
	
	clear: function() {
		this.selection_a = [];
		this.widget.events.fire('onSelectionChanged');
	},
	
	
	each: function(callback) {
		for(var i = 0; i < this.selection_a.length; i++) callback.call(this, this.selection_a[i], i);
	}
	
});






Dino.Selectable = function() {
	this.selection = new Dino.SelectionManager(this);
}

