



Dino.declare('Dino.widgets.Grid', Dino.Widget, {
	
	defaultCls: 'dino-grid',
	
	render_html: function() { return '<table cellspacing="0" cellpadding="0"></table>'; },
	
	initialize: function(o) {
		Dino.widgets.Grid.superclass.initialize.call(this, o);
		
	},
	
	options: function(o) {
		Dino.widgets.Grid.superclass.options.call(this, o);
				
		
	}
	
	
}, 'grid');


Dino.declare('Dino.widgets.Grid.Row', Dino.Container, {
	
	renderHtml: function() { return '<tr></tr>'; },
	
	
})