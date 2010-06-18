

Dino.declare('Dino.layouts.TableRowLayout', Dino.Layout, {
	
	_initialize: function(o) {
		Dino.layouts.TableRowLayout.superclass._initialize.call(this, o);		
		this.layoutOpts = Dino.override({}, o);
	},
	
	
	insert: function(item) {
		var td = $('<td></td>');
		if('width' in this.layoutOpts) td.css('width', this.layoutOpts.width);
		td.append( item.el );
		this.container.el.append( td );
	},
	
	remove: function(item) {
//		item.el.remove();
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
}, 'table-row-layout');