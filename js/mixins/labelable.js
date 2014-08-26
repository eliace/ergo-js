

Ergo.defineMixin('Ergo.mixins.Labelable', function(o) {

	Ergo.smart_override(o, {
		components: {
			label: {
				etype: 'html:label',
				autoRender: false
			}
		}
	});
	
	
	this.setLabel = function(v) {
		this.label.opt('text', v);
	};
	
	this.getLabel = function(v) {
		this.label.opt('text');
	};

}, 'mixins:labelable');