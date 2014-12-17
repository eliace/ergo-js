

Ergo.declare_mixin('Ergo.mixins.Iconable', function(o) {
	
	o.components = Ergo.smart_override({
		before: {
			etype: 'icon',
			weight: -1000,
			ignore: true,
			cls: 'before'				
		},
		after: {
			etype: 'icon',
			weight: 1000,
			ignore: true,
			cls: 'after'			
		}		
	}, o.components);


/*	
	Ergo.smart_override(o, {
//		layout: 'hbox',
		set: {
			'icon': function(v) {
				if(v && !('before' in this)) {
					this.components.add(this.options.components.before, 'before');
					// this.children.add({
						// etype: 'icon',
						// weight: -1000,
						// cls: 'before'										
					// }, 'before', 'component');
				}
				else if(!v && ('before' in this)) {
					this.before.destroy()
				}
				
				if('before' in this)
					this.before.states.only(v, 'e-icon-');
			},
			'xicon': function(v) {
				
				if(v && !('after' in this)) {
					this.components.add(this.options.components.after, 'after');
					// this.children.add({
						// etype: 'icon',
						// weight: 1000,
						// cls: 'after'									
					// }, 'after', 'component');
				}
				else if(!v && ('after' in this)) {
					this.after.destroy()
				}
				
				if('after' in this)
					this.after.states.only(v, 'e-icon-');
			}
		}
	});
*/	


	o.set = Ergo.smart_override({
//		layout: 'hbox',
		'icon': function(v) {
			if(v && !('before' in this)) {
				this.components.add(this.options.components.before, 'before');
				// this.children.add({
					// etype: 'icon',
					// weight: -1000,
					// cls: 'before'										
				// }, 'before', 'component');
			}
			else if(!v && ('before' in this)) {
				this.before.destroy();
			}
			
			if('before' in this)
				this.before.states.only(v, 'icon-');
		},
		'xicon': function(v) {
			
			if(v && !('after' in this)) {
				this.components.add(this.options.components.after, 'after');
				// this.children.add({
					// etype: 'icon',
					// weight: 1000,
					// cls: 'after'									
				// }, 'after', 'component');
			}
			else if(!v && ('after' in this)) {
				this.after.destroy();
			}
			
			if('after' in this)
				this.after.states.only(v, 'icon-');
		}
	}, o.set);


	
}, 'iconable');
