

//= require "labeled-box"


Ergo.declare('Ergo.widgets.ImageBox', 'Ergo.widgets.LabeledBox', {
	
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
	
	
	
}, 'image-box');
