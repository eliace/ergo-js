


Ergo.defineClass('Bootstrap.widgets.Progress', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'progress',
		defaultComponent: {
			cls: 'progress-bar',
			states:{
				'success:appearance': 'progress-bar-success',
				'info:appearance': 'progress-bar-info',
				'warning:appearance': 'progress-bar-warning',
				'danger:appearance': 'progress-bar-danger',
				'striped': 'progress-bar-striped'
			},
			binding: function(v) {
				this.el.css('width', v+'%');
	//			this.sr.opt('text', v+'% Complete');
				this.el.attr('aria-valuenow', v);
				
				if(this.options.labeled)
					this.opt('text', v+'%');				
			}
		},
		components: {
			bar: {
			},
			sr: {
				etype: 'html:span',
				cls: 'sr-only',
				autoRender: 'ignore'
			}
		},
		binding: function(v) {
			this.bar.opt('value', v)
		}
	},
	
	setAppearance: function(v) {
		this.bar.states.set(v);
	},
	
	setStriped: function(v) {
		this.bar.states.toggle('striped');
	},
	
	setAnimated: function(v) {
		this.bar.states.toggle('active');		
	},
	
	setLabeled: function(v) {
		this.bar.opt('labeled', v);
	}
	
	
}, 'bootstrap:progress');


