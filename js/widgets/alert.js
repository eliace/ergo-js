
//= require <widgets/basic/box>

Ergo.defineClass('Ergo.widgets.Alert', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'alert',
		components: {
			title: {
				etype: 'html:strong'
			},
			message: {
				etype: 'text'
			}
		}
	},
	
	
	setTitle: function(v) {
		this.title.opt('text', v);
	},
	
	setText: function(v) {
		this.message.opt('text', v);
	}
	
	
}, 'widgets:alert');
