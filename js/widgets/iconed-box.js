
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
				state: 'hidden'
			},
			after: {
				etype: 'icon',
				weight: 1000,
				state: 'hidden'
			}
		},
		set: {
			'icon': function(v) {
				var o = this.options;
				this.before.states.setOnly(o.icon);
				this.before.states.toggle('hidden', !o.icon);				
			},
			'xicon': function(v) {
				var o = this.options;
				this.after.states.setOnly(o.xicon);
				this.after.states.toggle('hidden', !o.xicon);				
			}
		}
	}
		
}, 'iconed-box');