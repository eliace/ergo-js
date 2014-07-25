


Ergo.defineClass('Bootstrap.widgets.Thumbnail', 'Ergo.widgets.Link', {
	
	defaults: {
		cls: 'thumbnail',
		components: {
			content: {
				etype: 'html:img'
			}
		}
	},
	
	setImage: function(v) {
		this.content.opt('src', v);
	},
	
	setAlt: function(v) {
		this.content.opt('alt', v);
	}
	
}, 'bootstrap:thumbnail');


