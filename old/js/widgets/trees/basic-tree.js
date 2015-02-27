
//= require <widgets/tree>


Ergo.declare('Ergo.widgets.BasicTree', 'Ergo.widgets.Tree', {
	
	defaults: {
		
		dynamic: true,
		
		node: {
			
			components: {
				// content: {
					// onClick: function() {
						// this.parent.states.toggle('expanded');
					// }
				// },
				content: {
					etype: 'text-item'
//					autoBind: false
//					style: {'display': 'inline-block'},

				},
				subtree: {
					hidden: true,
					dataId: 'children',
					dynamic: true,
					mixins: ['effects'],
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
					}
				}
			}
			
			
			
		}
		
		
	}
	
}, 'basic-tree');
