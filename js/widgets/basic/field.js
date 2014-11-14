

/**
 * <input type="text" class="field">
 *  
 * `etype: 'field'`
 * 
 * События:
 * 	`change`
 * 
 * @class
 * @name Ergo.widgets.Field
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Field', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<input type="text"/>',
		baseCls: 'field',
		binding: function(v) {
			this.el.val(v);
		},
		events: {
			'jquery:change': function(e) {
//				this.opt('value', this.el.val());
				this.events.fire('change', {value: this.el.val()});
			}			
		}
	}
	
}, 'widgets:field');
