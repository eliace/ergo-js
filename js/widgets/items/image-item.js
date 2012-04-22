
//= require <widgets/labeled-box>


Ergo.declare('Ergo.widgets.ImageItem', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-image-item',
		components: {
			content: {
				etype: 'img'
			}
		},
		set: {
			'text': function(v) { this.opt('xlabel', v); },
			'image': function(v) { this.content.opt('src', v); }
		}
	}
	
	
	
}, 'image-item');
