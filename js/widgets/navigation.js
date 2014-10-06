

Ergo.defineClass('Ergo.widgets.Navigation', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'navigation',
		html: '<nav/>',
		components: {
			header: {
				layout: 'fluid',
				cls: 'header',
				components: {
					title: {
						etype: 'link',
						cls: 'title'
					}
				}
			},
			content: {
				layout: 'fluid',
				cls: 'content'
			}
		}
		
	},
	
	
	setTitle: function(v) {
		this.header.title.opt('text', v);
	}
	
	
}, 'widgets:navigation');
