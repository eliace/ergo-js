
Ergo.defineMixin('Ergo.mixins.Caret', function(o) {
	
	o.components = Ergo.smart_override({
		caret: {
			etype: 'html:span',
			cls: 'caret'			
		}
	}, o.components);
	
	Ergo.smart_build(o.components);
	
}, 'mixins:caret');
