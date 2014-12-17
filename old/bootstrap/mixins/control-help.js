


Ergo.defineMixin('Bootstrap.mixins.HelpBlock', {
	
	options: {
		components: {
			help: {
				weight: 200,
				etype: 'html:span',
				cls: 'help-block'
			}
		}
	},
	
	
	setHelp: function(v) {
		this.help.opt('text', v);
	}
	
}, 'mixins:control-help');

