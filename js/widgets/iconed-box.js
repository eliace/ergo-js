
//= require "natives/all"
//= require "icon"
//= require <layouts/hbox>

Ergo.declare('Ergo.widgets.IconedBox', 'Ergo.widgets.Box', {
	
	defaults: {
		layout: 'hbox',
		components: {
			before: {
				etype: 'icon',
				weight: -1000,
				cls: 'e-before',
				state: 'hidden'
			},
			after: {
				etype: 'icon',
				weight: 1000,
				cls: 'e-after',
				state: 'hidden'
			}
		},
		set: {
			'icon': function(v) {
//				var o = this.options;
				this.before.states.setOnly(v);
				this.before.states.toggle('hidden', !v);				
			},
			'xicon': function(v) {
//				var o = this.options;
				this.after.states.setOnly(v);
				this.after.states.toggle('hidden', !v);				
			}
		}
	}
		
}, 'iconed-box');