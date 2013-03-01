




Ergo.declare('Ergo.widgets.Icon', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-icon'
//		html: '<div>icon</div>'
	}
	
	
	// setMode: function(v) {
		// this.states.toggle('e-mode-'+v, 'e-mode-');
	// }
	
}, 'pic-icon');




Ergo.declare('Ergo.widgets.FontIcon', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-font-icon'
//		html: '<div>icon</div>'
	}	
	
}, 'font-icon');



Ergo.alias('icon', Ergo.widgets.Icon);
