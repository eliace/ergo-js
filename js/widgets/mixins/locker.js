
Ergo.defineMixin('Ergo.widgets.Lockable', function(o){
	
	o.components = Ergo.smart_override({
		locker: {
			etype: 'box',
			cls: 'locker',
			weight: 1000,
			autoHeight: 'ignore',
		}		
	}, o.components);


	// o.events = Ergo.smart_override({
		// 'fetch': function() {
			// this.states.set('loading');
		// },		
		// 'fetched': function() {
			// this.states.unset('loading');
		// }		
	// }, o.events);

//	Ergo.smart_override(o, {cls: 'lockable'});
	
	o.states = Ergo.smart_override({
		'locked': 'locked'		
	}, o.states);
	
//	Ergo.smart_build(o);
	
}, 'mixins:lockable');
