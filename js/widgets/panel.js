
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
						cls: 'title'
//						html: '<h2/>'
					}
					// buttons: {
						// cls: 'buttons',
						// layout: 'hbox',
						// defaultItem: {
							// etype: 'button-item'
						// }
					// }
				}
			},
			content: {
				weight: 0,
				cls: 'e-panel-content'
				
			},
			footer: {
				weight: 10,
				html: '<footer/>',
				hidden: true
//				state: 'hidden'
			}
		}
		
//		headerButtons: [],
//		footerButtons: []
		
		// set: {
			// 'title': function(s) { this.header.title.opt('text', s); }
		// }
	},
	
	
	// $init: function(o) {
		// this.$super(o);
// 		
// //		Ergo.smart_override(o.components.header.components.buttons, {items: o.headerButtons});
	// },
	
	setTitle: function(s) {
		this.header.title.opt('text', s);
	}
	
	
	
}, 'panel');
