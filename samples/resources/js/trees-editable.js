
var clipboard = [];


var treeData = new Dino.core.DataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });
  
	
var treeContextMenu = $.dino({
	dtype: 'context-menu',

	menuModel: {
		item: {
			content: {
				dtype: 'text-item'
			}
		}
	},
	
	items: [
		{content: {icon: 'silk-icon-page-white-edit', text: 'Переименовать'}, tag: 'rename'},
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
	
});	
	
	
  
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
		
		extensions: [Dino.Selectable, Dino.Focusable, Dino.TreeNavigation],
		
		height: 'auto',
	  
	  isDynamic: true,
	  
	  treeModel: {
	    node: {
				dtype: 'indent-tree-node',
				content: {
          icon: true,
          dataId: 'name',		
					state: 'unselectable',				
					onClick: function() {
						this.getParent(Dino.widgets.Tree).selection.set(this.parent);
					},
					extensions: [Dino.Droppable],
					components: {
						text: {
							content: {
								extensions: [Dino.Editable, Dino.Draggable],
								editor: {
									dtype: 'text-editor',
//									style: {'font-size': '14px', 'line-height': '14px'},
									width: 250
								},
			          onDrag: function(e) {
			            this.parent.states.set('dragged');
			            
			            e.dragContext.proxy = $.dino({
			              dtype: 'text',
			              text: this.getText(),
			              cls: 'dino-border-all',
			              style: {'background-color': '#fff'},
			              opacity: .7
			            });
			            
			            e.dragContext.offset = [-10, -10];
			            
			          }
								
							}
						}
					},
					
					contextMenu: treeContextMenu,
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
			}, 0);
			
			e.target.states.toggle('expand-collapse', true);
		},

		onAddFile: function(e) {
			var node = e.target;
			
			node.data.entry('children').add({
		    value: 0,
				type: "page-white",
		    name: "New file"
			}, 0);
			
			e.target.states.toggle('expand-collapse', true);
		},
		
		
		onDelete: function(e) {
			var node = e.target;
			
			node.data.del();
		},
		
		onRename: function(e) {
			var node = e.target;
			
			node.content.text.content.startEdit();			
			
		},
		
		onCut: function(e) {
			var node = e.target;
			
			clipboard.push( node.data.get() );
			node.data.del();
		},
		
		onCopy: function(e) {
			var node = e.target;
			
			clipboard.push( node.data.get_copy() );
		},
		
		onPaste: function(e) {
			var node = e.target;
			
			var obj = clipboard.pop();
			
			if(!obj) return;
			
			if(node.options.isLeaf) {
				node.data.source.add(obj, node.index+1);				
			}
			else {
				node.data.entry('children').add(obj, 0);				
				node.states.toggle('expand-collapse', true);
			}
			
		},
		
		
				
	}
  
});
