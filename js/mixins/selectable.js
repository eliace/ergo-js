





Ergo.defineClass('Ergo.objects.Selection', 'Ergo.core.Object', {
	
	defaults: {
		selectState: 'selected'
	},
	
	
	
	initialize: function(o, w) {
		this._widget = w;
		this._selected = undefined;
		
		this.$super(o);
	},
	
	
	set: function(w) {
		
		var self = this;
		
		if(!w) return;
		
		if(this._selected)
			this._selected.states.unset( self.options.selectState );
		// this._widget.children.each(function(child) {
			// if( child != w ) child.states.unset( self.options.selectState );
		// });
		
		w.states.set( this.options.selectState );
		
		this._selected = w;
		
	},
	
	get: function() {
		return this._selected;
	},
	
	clear: function() {
		this._selected = null;
	}
	
	
	
});






Ergo.defineMixin('Ergo.mixins.Selectable', {
	
	setSelectOn: function(selectEvent) {
		var self = this;
		if(selectEvent) {
			this.events.reg(selectEvent, function(e) {
				self.events.raise('selected', e.target);
			});
		}		
	}
	
});




Ergo.defineMixin('Ergo.mixins.Selection', function(o) {
	
/*	
	this.selection = {
		
		_sel_state: 'selected',
		
		_selected: null,
		
		_widget: null,
		
		
		
	};
	
	
	this.selection._widget = this;
	this.selection._sel_state = o.selectState || this.selection._sel_state; 
*/

	this.selection = new Ergo.objects.Selection(o.selection, this);
	
	
	// this.setSelectOn = function(selectEvent) {
		// var self = this;
		// if(selectEvent) {
			// this.events.reg(selectEvent, function(e) {
				// self.selection.set(e.target);
			// });
		// }
	// };
	
	
	this.setSelectedItem = function(i) {
		this.selection.set( this.item(i) );
	};
	
	this.setSelectedComp = function(i) {
		this.selection.set( this.component(i) );
	};
	
	
}, 'mixins:selection');
