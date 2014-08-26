

Ergo.defineMixin('Ergo.mixins.Stack', function(o) {
	
	Ergo.smart_override(o, {
		defaultItem: {
			hideOnRender: true
		}
	});
	
	
	
	this.setVisible = function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		this.children.each(function(c){
			(c != child) ? c.hide() : c.show();
		});
		
		if(child.layout) child.$layoutChanged();
		
		if(this._active)
			this._active.states.unset('active');
		
		this._active = child;
		
		this._active.states.set('active');
		
		return child;
	};
	
	
	this.getVisible = function() {
		return this._active;
	};
	
	
}, 'mixins:stack');
