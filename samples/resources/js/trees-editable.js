


var treeData = new Dino.data.ArrayDataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });
  
  
$.dino({
	dtype: 'panel',
  renderTo: '.preview',
	title: 'List tree',

	cls: 'dino-border-all',

	width: 400,
	height: 300,
	
	content: {
	  dtype: 'tree',
	  cls: 'tree-list dino-text-content',
		
	  data: treeData,
		
		extensions: [Dino.Selectable, Dino.Focusable],
		
		height: 'auto',
	  
	  isDynamic: true,
	  
	  treeModel: {
	    node: {
				dtype: 'indent-tree-node',
	      components: {
					content: {
	          icon: true,
	          dataId: 'name',
						
						onClick: function() {
							this.getParent(Dino.widgets.Tree).selection.set(this.parent);
						}
					}
	      },
	      binding: function(val) {
	        this.opt('icon', 'silk-icon-'+val.type);
	        if(val.type != 'folder' && val.type != 'drive') this.opt('isLeaf', true);
	      }
	    }
	  },
		
		
		onKeyDown: function(e) {
			
	    var catched = false;
	    var selected_node = this.selection.get();
	    if(selected_node) {
				
				// UP
				if(e.keyCode == 38) {
					var prev = null;
					if(selected_node.index == 0) {
						prev = selected_node.parent.parent;						
					}
					else {
						prev = selected_node.parent.items.get(selected_node.index-1);						

						while(prev.states.is('expanded')) {
							prev = prev.subtree.items.last();
						}

					}
					
					if(prev) {
						this.selection.set(prev);
					}
					
					catched = true;
				}
				// DOWN
				else if(e.keyCode == 40) {
					var next = null;
					
					
					var next_child = function(node) {
						return node.subtree.items.is_empty() ? null : node.subtree.items.first();
					}
					
					var next_sibling = function(node) {
						return (node.index == node.parent.items.size()-1) ? null : node.parent.items.get(node.index+1);
					}
					
					
					if(selected_node.states.is('expanded')) {
						next = next_child(selected_node);
					}
					
					while(!next) {
						next = next_sibling(selected_node);
						selected_node = selected_node.parent.parent;
					}
					
					if(next) {
						this.selection.set(next);
					}						
					
					
					catched = true;
				}

				// SPACE
				else if(e.baseEvent.charCode == 32) {
					selected_node.states.toggle('expand-collapse');
					catched = true;
				}
				
			}
			
			
	    if(catched) e.baseEvent.preventDefault();			
			
		}
				
	}
  
});
