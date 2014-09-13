
Ergo.defineClass('Ergo.widgets.CaretBox', 'Ergo.widgets.Box', {
	
	defaults: {
		components: {
			// content: {
				// etype: 'text'
			// },
			caret: {
				etype: 'html:span',
				cls: 'caret'
			}
		}
	},
	
	// setText: function(v) {
		// this.content.opt('text', v);
	// }
	
}, 'widgets:caret-box');
