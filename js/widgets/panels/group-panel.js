
//= require "panel"

/**
 * @class
 * @extends Ergo.core.Container
 */
Ergo.declare('Ergo.widgets.GroupPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		baseCls: 'dino-group-panel',
		components: {
			header: {
				etype: 'box',
				html: '<legend/>'
			}
		}
	},
	
	$html: function() { return '<fieldset></fieldset>'; },
	
	$opt: function(o) {
		Ergo.widgets.GroupPanel.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.opt('innerText', o.title);
	}
	
}, 'group-panel');