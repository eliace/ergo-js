

Ergo.defineClass('Bootstrap.widgets.Label', 'Ergo.widgets.Text', {
	
	defaults: {
		cls: 'label',
		state: 'default',
		states: {
			'default:color': 'label-default',
			'primary:color': 'label-primary',
			'success:color': 'label-success',
			'info:color': 'label-info',
			'warning:color': 'label-warning',
			'danger:color': 'label-danger'
		}
	}
	
}, 'bootstrap:label');

