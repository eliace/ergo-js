

Ergo.defineClass('Ergo.widgets.Button', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<button/>',
		cls: 'btn',
		type: 'default',
		states: {
			'default:type': 'default',
			'primary:type': 'primary',
			'success:type': 'success',
			'info:type': 'info',
			'warning:type': 'warning',
			'danger:type': 'danger',
			'tool:type': 'tool',
			
			'small:size': 'small',
			'large:size': 'large',
			'tiny:size': 'tiny',
			
			'outline': 'outline',
			'flat': 'flat',
			'line': 'line',

			'block': 'block',
			'round': 'round',
			
			'disabled': function(on) { on ? this.layout.el.prop('disabled', 'disabled') : this.layout.el.removeProp('disabled'); return false; }
		}
	}
	
}, 'widgets:button');
