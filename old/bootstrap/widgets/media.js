



Ergo.defineClass('Bootstrap.widgets.Media', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'media',
		components: {
			leftBox: {
				etype: 'html:a',
//				state: 'pull-left',
				pull: 'left',
				states: {
					'left:pull': 'pull-left',
					'right:pull': 'pull-right'
				},
				components: {
					content: {
						etype: 'html:img'
					}
				}
			},
			content: {
				cls: 'media-body',
				defaultItem: {
					etype: 'bootstrap:media'
				},
				components: {
					heading: {
						etype: 'html:h4',
//						html: '<h4/>',
						cls: 'media-heading'
					},
					content: {
						etype: 'html:text'
					}
				}
			}
		}
	},
	
	setImage: function(v) {
		this.leftBox.content.opt('src', v);
	},
	
	setTitle: function(v) {
		this.content.heading.opt('text', v);
	},
	
	setText: function(v) {
		this.content.content.opt('text', v);
	}
	
}, 'bootstrap:media');


