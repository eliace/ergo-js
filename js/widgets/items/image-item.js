

//= require <mixins/labelable>


Ergo.declare('Ergo.widgets.ImageItem', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-image-item',
		layout: 'vbox',
		mixins: ['labelable'],
		components: {
			content: {
				etype: 'image'
			}
		},
		set: {
			'text': function(v) { this.opt('xlabel', v); },
			'image': function(v) { this.content.opt('src', v); }
		}
	}
	
	
	
}, 'image-item');
