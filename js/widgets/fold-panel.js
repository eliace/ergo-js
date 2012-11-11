

Ergo.declare('Ergo.widgets.FoldBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'content',
		
		components: {
			west: {
				html: '<aside/>',
				cls: 'west'
			},
			content: {
				
			},
			east: {
				html: '<aside/>',
				cls: 'east'				
			}
		}
		
		
	}
	
	
	
}, 'fold-box');
