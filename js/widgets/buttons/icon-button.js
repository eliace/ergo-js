
Ergo.defineClass('Ergo.widgets.IconButton', 'Ergo.widgets.Button', {

	defaults: {
		cls: 'icon-button',
		components: {
			content: {
				etype: 'icon'
			}
		}
	},


	set icon(v) {
		this.$content.states.set(v);
	}

}, 'widgets:icon-button');
