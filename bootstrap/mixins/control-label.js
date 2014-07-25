

Ergo.defineMixin('Bootstrap.mixins.ControlLabel', {
	
	options: {
		components: {
			label: {
				weight: -100,
				etype: 'html:label',
				cls: 'control-label',
				autoRender: 'no'
//				noWrapper: true
			}
		}
	},
	
	
	setLabel: function(v) {
		this.label.opt('text', v);
	}
	
}, 'mixins:control-label');


