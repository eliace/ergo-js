
var buffer = null;


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
			
			buffer = node.data.get();
			node.data.del();
		},
		
		onCopy: function(e) {
			var node = e.target;
			
			buffer = node.data.get_copy();
		},
		
		onPaste: function(e) {
			var node = e.target;
			
			if(!buffer) return;
			
			node.data.item('children').add(buffer);
			
			e.target.states.toggle('expand-collapse', true);
			
			buffer = null;
		},
		
		
				
	}
  
});
