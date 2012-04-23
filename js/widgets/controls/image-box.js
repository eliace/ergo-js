

//= require "labeled-box"


Ergo.declare('Ergo.widgets.ImageBox', 'Ergo.widgets.LabeledBox', {
	
	defaults: {
		cls: 'e-image-item',
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
	
	
	
}, 'image-box');
