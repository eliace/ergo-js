
Ergo.defineClass('Ergo.widgets.Check', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<input type="checkbox"/>',
		binding: function(v) {
				this.el.prop('checked', v);
//			this.states.toggle('checked');
//			v ? this.el.attr('checked', '') : this.el.removeAttr('checked');
		},
		events: {
			'jquery:change': function(e, w) {
				w.opt('value', w.el.prop('checked'));
				w.events.fire('action');
			}
		}
		// states: {
			// 'checked': function(on) {
				// this.el.prop('checked', on);
// //				on ? this.el.prop('checked', '') : this.el.removeAttr('checked');				
			// }
		// }
	},
	
	
	setIndeterminate: function(v) {
		this.el.prop('indeterminate', v);
	}
	
}, 'widgets:check');
