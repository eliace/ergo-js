
//= require "panel"

/**
 * @class
 * @extends Dino.core.Container
 */
Dino.declare('Dino.widgets.GroupPanel', 'Dino.widgets.Panel', {
	
	defaults: {
		baseCls: 'dino-group-panel',
		components: {
			header: {
				dtype: 'box',
				html: '<legend/>'
			}
		}
	},
	
	$html: function() { return '<fieldset></fieldset>'; },
	
	$opt: function(o) {
		Dino.widgets.GroupPanel.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.opt('innerText', o.title);
	}
	
}, 'group-panel');