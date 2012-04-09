

//= require "natives/all"
//= require "icon"
//= require <layouts/hbox>


Ergo.declare('Ergo.widgets.ButtonItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-button-item',
		layout: 'hbox',
		html: '<button/>',
		components: {
			icon: {
				etype: 'icon',
				state: 'hidden',
				cls: 'before'
			},
			content: {
				etype: 'text',
				state: 'hidden'
			},
			xicon: {
				etype: 'icon',
				state: 'hidden',
				cls: 'after'
			}
		},
		onClick: function(){
			this.events.fire('onAction');
		},
		text: false,
		set: {
			'text': function(v) {
				this.content.opt('text', v);
				this.content.states.toggle('hidden', (!v && v !== ''));
			},
			'icon': function(v) {
				var o = this.options;
				this.icon.states.setOnly(o.icon);
				this.icon.states.toggle('hidden', !o.icon);				
			},
			'xicon': function(v) {
				var o = this.options;
				this.xicon.states.setOnly(o.xicon);
				this.xicon.states.toggle('hidden', !o.xicon);				
			}
		},
		get: {
			'text': function() {
				return this.content.opt('text');
			}
		}
	}
		
}, 'button-item');