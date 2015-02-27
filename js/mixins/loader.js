

Ergo.defineMixin('Ergo.widgets.Loader', function(o){
	
	o.components = Ergo.smart_override({
		loader: {
			etype: 'box',
			cls: 'loader',
			weight: 100,
			autoHeight: 'ignore',
			components: {
				icon: {
					etype: 'icon'					
				}
			}
		}		
	}, o.components);


	o.events = Ergo.smart_override({
		'fetch': function() {
			this.states.set('loading');
		},		
		'fetched': function() {
			this.states.unset('loading');
		}		
	}, o.events);

	Ergo.smart_override(o, {cls: 'loadable'});
	
	// o.states = Ergo.smart_override({
		// 'loading': 'loading'		
	// }, o.states);
	
//	Ergo.smart_build(o);
	
}, 'mixins:loader');
