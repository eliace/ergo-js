
//= require "natives/box"


Ergo.declare('Ergo.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-panel',
		components: {
			header: {
				weight: -10,
				html: '<header/>',
				components: {
					title: {
						html: '<h2/>'
					}
				}
			},
			content: {
				weight: 0,
				cls: 'e-panel-content'
				
			},
			footer: {
				weight: 10,
				html: '<footer/>',
				state: 'hidden'
			}
		}
		// set: {
			// 'title': function(s) { this.header.title.opt('text', s); }
		// }
	},
	
	
	setTitle: function(s) {
		this.header.title.opt('text', s);
	}
	
	
}, 'panel');
