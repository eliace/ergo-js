


Ergo.declare_mixin('Ergo.mixins.Stackable', function(o) {
	
	
//	o.defaultItem.hidden = true;
//	o.defaultComponent.hidden = true;
	
	
	this.setActive = function(i) {
		
		if(i === undefined || i === null) {
			if(this._active)
				this._active.hide();
		}
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		this.children.each(function(c){
			
			if(c == child) {
				c.show();
			}
			else {
				// var el = (c._wrapper) ? c._wrapper : c.el;
				// if(el.is(':visible'))
				c.hide();
			}
			
//			var m = (c != child) ? 'hide' : 'show';
			
//			(c != child) ? c.hide() : c.show();
		});
		
		if(child) child.$layoutChanged();
		
		this._active = child;
		
		return child;
	}
	
	
	o.active = ('active' in o) ? o.active : 0;
	
	
	
	
}, 'stackable');