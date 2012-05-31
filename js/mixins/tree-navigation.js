
//= require "selectable"
//= require "focusable"


Ergo.mixins.TreeNavigation = function(o) {
	
	Ergo.smart_override(o, {
		
		onKeyDown: function(e) {
			
	    var catched = false;
	    var selected_node = this.selection.get();
	    if(selected_node) {
				
				// UP
				if(e.keyCode == 38) {
					var prev = null;
					
					var prev_parent = function(node) {
						return node.parent.parent;
					}
					
					var prev_sibling = function(node) {
						return (node.index == 0) ? null : node.parent.item(node.index-1);
					}
					
					prev = prev_sibling(selected_node);
					
					if(prev) {
						while(prev.states.is('expanded')) {
							if(prev.subtree.items.is_empty()) break;
							prev = prev.subtree.items.last();
						}
					}
					else {
						if(!selected_node.options.root)
							prev = prev_parent(selected_node);
					}
										
					if(prev) {
						this.selection.set(prev);
						
	          var pos = prev.el.offset().top - this.el.offset().top;
	          if(pos < 0) {
	            this.el.scrollTop(this.el.scrollTop() - prev.el.outerHeight());
	          }
						
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
						if(selected_node.options.root) break;
						selected_node = selected_node.parent.parent;
					}
					
					if(next) {
						this.selection.set(next);

	          var pos = next.el.offset().top - this.el.offset().top;
	          if(this.el.height() - next.el.outerHeight() < pos) {
	            this.el.scrollTop(this.el.scrollTop() + next.el.outerHeight());
	          }
					}
					
					
					catched = true;
				}

				// SPACE
				else if(e.keyCode/*.baseEvent.charCode*/ == 32) {
					selected_node.states.toggle('expand-collapse');
					catched = true;
				}
				
			}
			
			
	    if(catched) e.baseEvent.preventDefault();			
			
		}
		
	});

	
};	