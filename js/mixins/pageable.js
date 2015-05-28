
/**
 * Эксклюзивное отображение одного из дочерних виджетов
 * 
 * Опции:
 * 	`active`
 * 
 * @mixin Ergo.mixins.Pageable
 */
Ergo.defineMixin('Ergo.mixins.Pageable', function(o) {
	
	Ergo.smart_override(o, {
		cls: 'pageable',
		// defaultItem: {
			// style: {'display': 'none'}
		// }
	});
	
	
	
	this.set_active = function(i) {
		
		var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
		
		// this.children.each(function(c){
			// (c != child) ? c.hide() : c.show();
		// });
		
		if(child.layout) child._layoutChanged();
		
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
	
	
	this.get_active = function() {
		return this._active;
	};
	
	
	
	
//	Ergo.smart_build(o);
	
}, 'mixins:pageable');



Ergo.alias('includes:pageable', {

	defaults: {
		cls: 'pageable'
	},

	overrides: {

		set_active: function(i) {
			
			var child = (i instanceof Ergo.core.Widget) ? i : this.children.find( Ergo.by_widget(i) );
			
			// this.children.each(function(c){
				// (c != child) ? c.hide() : c.show();
			// });
			
			if(child.layout) child._layoutChanged();
			
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
		},
		
		
		get_active: function() {
			return this._active;
		}


	}


});