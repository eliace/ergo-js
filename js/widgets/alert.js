
//= require <widgets/basic/box>

Ergo.defineClass('Ergo.widgets.Alert', 'Ergo.widgets.Box', {

	defaults: {
		cls: 'alert',
		layout: 'columns',
		components: {
			icon: {
				etype: 'icon'
			},
			content: {
				components: {
					title: {
						cls: 'alert-title',
						etype: 'html:strong'
					},
					message: {
						cls: 'alert-message',
						etype: 'box'
					}
				}
			},
			xicon: {
				etype: 'icon',
				autoRender: false
			}
		}
	},


	set title(v) {
		this.$content.$title.opt('text', v);
	},

	set icon(v) {
		this.$icon.states.set(v);
	},

	set text(v) {
		this.$content.$message.opt('text', v);
	}


}, 'widgets:alert');
