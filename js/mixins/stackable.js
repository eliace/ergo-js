


Ergo.declare_mixin('Ergo.mixins.Stackable', function(o) {
	
	
	this.setActive = function(i) {
		
		if(i === undefined || i === null) {
			if(this._active)
				this._active.hide();
		}
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		this.children.each(function(c){
			(c != child) ? c.hide() : c.show();
		});
		
		if(child) child.$layoutChanged();
		
		this._active = child;
		
		return child;
	}
	
	
	
}, 'stackable');