

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
	
	
	set_title: function(v) {
		this.header.title.opt('text', v);
	}
	
	
}, 'widgets:navigation');
