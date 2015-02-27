



Ergo.defineClass('Bootstrap.widgets.Glyphicon', 'Ergo.core.Widget', {
	
	defaults: {
		cls: 'glyphicon',
		html: '<span/>',
		states: {
			':icons': ['glyphicon-']
		}
	},
	
	setValue: function(v) {
		this.states.set('glyphicon-'+v);
	}
	
	
}, 'bootstrap:glyphicon');

