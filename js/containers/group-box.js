
//= require "box"

/**
 * @class
 * @extends Dino.Container
 */
Dino.containers.GroupBox = Dino.declare('Dino.containers.GroupBox', 'Dino.containers.Box', /** @lends Dino.containers.GroupBox.prototype */{
	
	defaults: {
		baseCls: 'dino-group-box',
		defaultItem: {
			dtype: 'box'
		},
		components: {
			title: {
				dtype: 'container',
				html: '<legend/>'
			}
		}
	},
	
	$html: function() { return '<fieldset></fieldset>'; },
	
	$opt: function(o) {
		Dino.containers.GroupBox.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.title.opt('innerText', o.title);
	}
	
}, 'group-box');