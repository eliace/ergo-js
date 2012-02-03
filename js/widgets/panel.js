
//= require "natives/box"


Ergo.declare('Ergo.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-panel',
		components: {
			header: {
				html: '<header/>'
			},
			content: {
				
			},
			footer: {
				html: '<footer/>'
			}
		}
	}
	
	
}, 'panel');
