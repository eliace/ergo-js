







Ergo.defineMixin('Ergo.mixins.Selectable', function(o) {
	
	
	this.selection = {
		
		_sel_state: 'selected',
		
		_selected: null,
		
		_widget: null,
		
		
		set: function(w) {
			
			var self = this;
			
			if(!w) return;
			
			this._widget.children.each(function(child){
				if( child != w ) child.states.unset( self._sel_state );
			});
			
			w.states.set( this._sel_state );
			
			this._selected = w;
			
		},
		
		get: function() {
			return this._selected;
		},
		
		clear: function() {
			this._selected = null;
		}
		
	};
	
	
	this.selection._widget = this;
	this.selection._sel_state = o.selectState || this.selection._sel_state; 
	
	
	this.setSelectOn = function(selectEvent) {
		var self = this;
		if(selectEvent) {
			this.events.reg(selectEvent, function(e) {
				self.selection.set(e.target);
			});
		}
	};
	
	
	this.setSelectedItem = function(i) {
		this.selection.set( this.item(i) );
	};
	
	
	
}, 'mixins:selectable');
