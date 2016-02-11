
//= require <widgets/basic/box>

Ergo.defineClass('Ergo.widgets.Alert', {

	extends: 'Ergo.widgets.Box',

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
						tag: 'strong',
						as: 'alert-title',
//						etype: 'html:strong'
					},
					message: {
						as: 'alert-message'
//						etype: 'box'
					}
				}
			},
			xicon: {
				etype: 'icon',
				autoRender: false
			}
		}
	},


	props: {
		set: {
			title: function(v) {
				this.$content.$title.opt('text', v);
			},

			icon: function(v) {
				this.$icon.set(v);
			},

			text: function(v) {
				this.$content.$message.opt('text', v);
			}
		}
	}




}, 'widgets:alert');
