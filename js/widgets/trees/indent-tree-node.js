
//= require "basic-tree-node"


Dino.declare('Dino.widgets.IndentTreeNode', 'Dino.widgets.BasicTreeNode', {
	
	
	defaults: {
		indent: 0,
		html: '<li><div class="tree-list-item"></div></li>',
		defaultComponent: {
			layoutSelector: '> .tree-list-item'			
		},
		components: {
			indent: {
				dtype: 'list',
				style: {'display': 'inline'},
				weight: 5,
				defaultItem: {
					dtype: 'text',
					cls: 'indent',
					innerHtml: '&nbsp;'
				}
			},
			subtree: {
				layoutSelector: null							
			}
		}				
	},
	
	$init: function(o) {
		Dino.widgets.IndentTreeNode.superclass.$init.apply(this, arguments);
		
		o.components.subtree.defaultItem.indent = o.indent+1;		
	},
	
	
	$construct: function(o) {
		Dino.widgets.IndentTreeNode.superclass.$construct.apply(this, arguments);
		
		for(var i = 0; i < o.indent; i++) {
			this.indent.items.add({});
		}		
	}
	
		
}, 'indent-tree-node');
