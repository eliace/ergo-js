




Ergo.declare('Ergo.widgets.Icon', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-icon'
//		html: '<div>icon</div>'
	},
	
	
	setMode: function(v) {
		this.states.toggle('e-mode-'+v, 'e-mode-');
	}
	
}, 'icon');
