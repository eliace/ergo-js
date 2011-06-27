
//= require <widgets/natives/all>
//= require <widgets/images/all>
//= require <layouts/hbox>


Dino.widgets.TextButton = Dino.declare('Dino.widgets.TextButton', 'Dino.widgets.Button', /** @lends Dino.widgets.TextButton.prototype */{
	
	aaa: 'TextButton',
	
	defaults: {
		cls: 'dino-text-button',
		layout: 'hbox',
		components: {
			icon: {
				dtype: 'icon',
				state: 'hidden'
			},
			content: {
				dtype: 'text',
				state: 'hidden'
			},
			xicon: {
				dtype: 'icon',
				state: 'hidden'
			}
		},
		text: false
	},
	
	
	$opt: function(o) {
		Dino.widgets.TextButton.superclass.$opt.apply(this, arguments);
		
		if('text' in o) {
			this.content.opt('text', o.text);
			this.content.states.toggle('hidden', (!o.text && o.text !== ''));
		}
		if('icon' in o) {
			this.icon.states.setOnly(o.icon);
			this.icon.states.toggle('hidden', !o.icon);
		}
		if('xicon' in o) {
			this.xicon.states.setOnly(o.xicon);
			this.xicon.states.toggle('hidden', !o.xicon);
		}
	}
	
	
}, 'text-button');

