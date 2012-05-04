

//= require <widgets/labeled-item>


Ergo.declare('Ergo.widgets.ImageItem', 'Ergo.widgets.LabeledItem', {
	
	defaults: {
		cls: 'e-image-box',
		layout: 'vbox',
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
