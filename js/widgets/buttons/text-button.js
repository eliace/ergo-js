
//= require <widgets/natives/all>
//= require <widgets/images/all>
//= require <layouts/hbox>


Ergo.widgets.TextButton = Ergo.declare('Ergo.widgets.TextButton', 'Ergo.widgets.Button', /** @lends Ergo.widgets.TextButton.prototype */{
	
//	aaa: 'TextButton',
	
	defaults: {
		cls: 'ergo-text-button',
		layout: 'hbox',
		components: {
			icon: {
				etype: 'icon',
				state: 'hidden'
			},
			content: {
				etype: 'text',
				state: 'hidden'
			},
			xicon: {
				etype: 'icon',
				state: 'hidden'
			}
		},
		text: false,
		set: {
			'text': function(v) {
				this.content.opt('text', v);
				this.content.states.toggle('hidden', (!v && v !== ''));
			},
			'icon': function(v) {
				this.icon.states.setOnly(v);
				this.icon.states.toggle('hidden', !v);				
			},
			'xicon': function(v) {
				this.xicon.states.setOnly(v);
				this.xicon.states.toggle('hidden', !v);				
			}
		}
	}
	
/*
	$opt: function(o) {
		Ergo.widgets.TextButton.superclass.$opt.apply(this, arguments);
		
		// if('text' in o) {
			// this.content.opt('text', o.text);
			// this.content.states.toggle('hidden', (!o.text && o.text !== ''));
		// }
		if('icon' in o) {
			this.icon.states.setOnly(o.icon);
			this.icon.states.toggle('hidden', !o.icon);
		}
		if('xicon' in o) {
			this.xicon.states.setOnly(o.xicon);
			this.xicon.states.toggle('hidden', !o.xicon);
		}
	}
*/	
	
}, 'text-button');

