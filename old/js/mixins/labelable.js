

Ergo.declare_mixin('Ergo.mixins.Labelable', function(o) {
/*	
	o.components = Ergo.smart_override({
		before: {
			etype: 'label',
			weight: -1000,
			binding: false,
			ignore: true,
			cls: 'before'				
		},
		after: {
			etype: 'label',
			weight: 1000,
			binding: false,
			ignore: true,
			cls: 'after'				
		}		
	}, o.components);
*/	
	
	
	Ergo.smart_override(o, {
//		layout: 'hbox',
		set: {
			'label': function(v) {
				if(v && !('before' in this)) {
//					this.items.add(this.options.components.before, 'before', 'component');
					this.items.add({
						etype: 'label',
						weight: -1000,
						binding: false,
						cls: 'before'										
					}, 'before', 'component');
				}
				else if(!v && ('before' in this)) {
					this.before.destroy()
				}
				
				if('before' in this)
					this.before.opt('text', v);
			},
			'xlabel': function(v) {
				
				if(v && !('after' in this)) {
//					this.items.add(this.options.components.after, 'after', 'component');
					this.items.add({
						etype: 'label',
						weight: 1000,
						binding: false,
						cls: 'after'										
					}, 'after', 'component');
				}
				else if(!v && ('after' in this)) {
					this.after.destroy()
				}
				
				if('after' in this)
					this.after.opt('text', v);
			}
		}
	});
	
}, 'labelable');
