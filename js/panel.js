

Dino.declare('Dino.Panel', 'Dino.Widget', {
	
	addComponent: function(key, o){
		this[key] = Dino.widget(o);
		this.children.add( this[key] );
		this.el.append(this[key].el);
	}
	
});