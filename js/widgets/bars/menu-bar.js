

Ergo.defineClass('Ergo.widgets.MenuBar', {

	extends: 'Ergo.widgets.List',

	defaults: {
		baseCls: 'menu-bar',
		defaultItem: {
			html: '<li/>',
			components: {
				content: {
					etype: 'link'
				}
			},
			set: {
				'text': function(v) {this.content.opt('text', v);}
			}
		},
	}


}, 'widgets:menu-bar');
