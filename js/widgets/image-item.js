



Ergo.declare('Ergo.widgets.ImageItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-image-item',
		components: {
			image: {
				etype: 'image'
			},
			text: {
				etype: 'text'
			}
		},
		set: {
			'text': function(v) { this.text.opt('text', v); },
			'image': function(v) { this.image.opt('src', v); }
		}
	}
	
	
	
}, 'image-item');
