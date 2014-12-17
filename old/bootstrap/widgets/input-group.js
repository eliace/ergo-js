



Ergo.defineClass('Bootstrap.widgets.InputGroup', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'input-group',
		states: {
			'large:size': 'input-group-lg',
			'small:size': 'input-group-sm',
			'tiny:size': 'input-group-xs',
		},
		components: {
			addon: {
				weight: -1,
				etype: 'bootstrap:input-addon'
			},
			input: {
				etype: 'html:input',
				cls: 'form-control'
			}
		}
	},
	
	setPlaceholder: function(v) {
		this.input.opt('placeholder', v);
	}
	
}, 'bootstrap:input-group');


