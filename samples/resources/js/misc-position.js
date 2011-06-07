

var w = $.dino({
  renderTo: '.preview',
	dtype: 'list',
	
	defaultItem: {
		width: 100,
		height: 100,
		style: {'color': '#f00'}
	},
	
	items: [{
		dtype: 'box'
	}, {
		dtype: 'dropdown-box'
	}, {
		dtype: 'dropdown-box'
	}]
	
});

w.items.get(1).show(w.items.get(0), '')
