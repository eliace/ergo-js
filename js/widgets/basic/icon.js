
/**
 * <i class="icon">
 *  
 * `etype: 'icon'`
 * 
 * Опции:
 * 	`text`
 * 	`icon`
 * 
 * @class
 * @name Ergo.widgets.Icon
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Icon', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<i/>',
		cls: 'icon',
		binding: 'text'
	},
	
	set_icon: function(v) {
		this.states.set(v);		
	},
	
	set_text: function(v) {
		this.states.set(v);		
	}
	
}, 'widgets:icon');
