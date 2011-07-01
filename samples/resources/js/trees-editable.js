
var buffer = null;


var treeData = new Dino.core.DataSource([]);

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
				content: {
          icon: true,
          dataId: 'name',						
					onClick: function() {
						this.getParent(Dino.widgets.Tree).selection.set(this.parent);
					},
					components: {
						text: {
							content: {
								extensions: [Dino.Editable],
								editor: {
									dtype: 'text-editor',
//									style: {'font-size': '14px', 'line-height': '14px'},
									width: 250
								}
							}
						}
					},
					contextMenu: {
						dtype: 'context-menu',

						menuModel: {
							item: {
								content: {
									dtype: 'text-item'
								}
							}
						},
						
						items: [
							{content: {icon: 'silk-icon-page-white-edit', text: 'Редактировать'}, tag: 'edit'},
							'-',
							{content: {icon: 'silk-icon-folder-add', text: 'Добавить каталог'}, tag: 'addDir'},
							{content: {icon: 'silk-icon-page-white-add', text: 'Добавить файл'}, tag: 'addFile'},
							{content: {icon: 'silk-icon-cross', text: 'Удалить'}, tag: 'delete'},
							'-',
							{content: {icon: 'silk-icon-cut', text: 'Вырезать'}, tag: 'cut'},
							{content: {icon: 'silk-icon-page-white-copy', text: 'Копировать'}, tag: 'copy'},
							{content: {icon: 'silk-icon-paste-plain', text: 'Вставить'}, tag: 'paste'}
						],
						
						onSelect: function(e) {
							if(e.target.tag) {
								var tree = this.sourceWidget.getParent(Dino.widgets.Tree);
								tree.events.fire('on'+e.target.tag.capitalize(), {target: this.sourceWidget.parent});								
							}
						}
						
					},
					onContextMenu: function(e) {
						this.getParent(Dino.widgets.Tree).selection.set(this.parent);
					}
	      },
	      binding: function(val) {
	        this.opt('icon', 'silk-icon-'+val.type);
	        if(val.type != 'folder' && val.type != 'drive') this.opt('isLeaf', true);
	      }
	    }
	  },
		
		
		onAddDir: function(e) {
			var node = e.target;
			
			node.data.entry('children').add({
		    value: 456,
				type: "folder",
		    name: "New folder",
				children: []
			});
			
			e.target.states.toggle('expand-collapse', true);
		},

		onAddFile: function(e) {
			var node = e.target;
			
			node.data.entry('children').add({
		    value: 0,
				type: "page-white",
		    name: "New file"
			});
			
			e.target.states.toggle('expand-collapse', true);
		},
		
		
		onDelete: function(e) {
			var node = e.target;
			
			node.data.del();
		},
		
		onEdit: function(e) {
			var node = e.target;
			
			node.content.text.content.startEdit();			
			
		},
		
		onCut: function(e) {
			var node = e.target;
			
			buffer = node.data.val();
			node.data.del();
		},
		
		onCopy: function(e) {
			var node = e.target;
			
			buffer = Dino.deep_copy(node.data.val());
		},
		
		onPaste: function(e) {
			var node = e.target;
			
			if(!buffer) return;
			
			node.data.item('children').add(buffer);
			
			e.target.states.toggle('expand-collapse', true);
			
			buffer = null;
		},
		
		
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
						return (node.index == 0) ? null : node.parent.items.get(node.index-1);
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
				else if(e.baseEvent.charCode == 32) {
					selected_node.states.toggle('expand-collapse');
					catched = true;
				}
				
			}
			
			
	    if(catched) e.baseEvent.preventDefault();			
			
		}
				
	}
  
});
