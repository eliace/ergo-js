
Ergo.defineClass('Ergo.widgets.ListTree', {

	extends: 'Ergo.widgets.NestedList',

	defaults: {
		cls: 'list-tree',
		
		nestedItem: {
			components: {
				content: {
					etype: 'link'
				}
			}
		}
	},

}, 'widgets:list-tree');
