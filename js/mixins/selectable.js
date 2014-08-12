





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
		
		this._widget.events.fire('selection:changed');
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
			var i = selectEvent.indexOf(':');
			var prefix = false;
			if(i > 0) {
				prefix = selectEvent.substr(0, i);
				selectEvent = selectEvent.substr(i+1);
			}
			
			if( prefix == 'jquery' ) {
				this.el.on(selectEvent, function(e){
					self.events.rise('selected', self);
				});
			}
			else {
				this.events.reg(selectEvent, function(e) {
					self.events.rise('selected', self);
				});				
			}
			
		}		
	}
	
}, 'mixins:selectable');




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
	
	this.setSelected = function(i) {
		
		var self = this;
		
//		var selectables = [];
		var callback = Ergo.by_widget(i);
		
		this.walk(function(i) {
			if(callback.call(this, this)) {
				
//				this.states.set('active');
				this.events.rise('selected', this);
				
				return false;
			}
		});
		
	};
	
	
	
	this.setSelectedItem = function(i) {
		this.selection.set( this.item(i) );
	};
	
	this.setSelectedComp = function(i) {
		this.selection.set( this.component(i) );
	};
	
	
}, 'mixins:selection');
