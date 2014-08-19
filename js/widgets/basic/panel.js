
//= require <widgets/widgets>



Ergo.defineClass('Ergo.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<div/>',
		cls: 'panel',
		components: {
			header: {
				cls: 'panel-header',
				components: {
					title: {
						etype: 'html:h3',
						cls: 'panel-title'
					}
				}				
			},
			content: {
				cls: 'panel-content'				
			},
			footer: {
				cls: 'panel-footer',				
				autoRender: false
			}
		}
	},
	
	
	setTitle: function(v) {
		this.header.title.opt('text', v);
	}
	
}, 'widgets:panel');
