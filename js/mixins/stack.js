

Ergo.defineMixin('Ergo.mixins.Stack', function(o) {
	
	Ergo.smart_override(o, {
//		cls: 'stackable',
		defaultItem: {
			style: {'display': 'none'}
		}
	});
	
	
	
	this.setActive = function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		// this.children.each(function(c){
			// (c != child) ? c.hide() : c.show();
		// });
		
		if(child.layout) child.$layoutChanged();
		
		var promise = $.when(true);
		
		if(this._active) {
			this._active.states.unset('active');
			promise = this._active.hide();
		}

		this._active = child;

		promise.then(function(){
		
			this._active.states.set('active');
			this._active.show();
			
		}.bind(this));
		
		
		return child;
	};
	
	
	this.getActive = function() {
		return this._active;
	};
	
	
	
	
//	Ergo.smart_build(o);
	
}, 'mixins:stackable');
