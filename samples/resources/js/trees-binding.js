		
var treeData = [{
  name: 'Хряков С.И.',
  type: 'computer',
  children: [{
    name: 'C:',
    type: 'drive',
    children: [{
      name: 'WINDOWS',
      type: 'folder'
    }]
  }, {
    name: 'D:',
    type: 'drive',
    children: [{
      name: 'Фильмы',
      type: 'folder',
      children: [{
        name: 'Звездные Войны 1.avi',
        type: 'file'
      }, {
        name: 'Звездные Войны 3.avi',
        type: 'file'
      }, {
        name: 'Миссия Серенити.avi',
        type: 'file'
      }]
    }, {
      name: 'Работа',
      type: 'folder',
      children: [{
        name: 'bash.org.ru_лучшее.txt',
        type: 'file'
      }]
    }, {
      name: 'README.txt',
      type: 'file'
    }]
  }, {
    name: 'Z:',
    type: 'drive',
  }]
}];	
	
	
$.dino({
  dtype: 'tree',
	renderTo: '.preview',
	cls: 'dynamic-tree',
	
  data: treeData,
	
  isDynamic: true,
	
	treeModel: {
		node: {
			cls: 'dynamic-tree-node',
			components: {
		    content: {
		      components: {
		        leftIcon: {
		          states: {
		            'computer': 'led-icon-computer',
		            'drive': 'led-icon-drive',
		            'folder': 'led-icon-folder',
		            'file': 'led-icon-page',
		          }
		        },
		      },
					showLeftIcon: true,
		      dataId: 'name'
		    }				
			},
			binding: function(val) {
				this.opt('icon', val.type);
				if(val.type == 'file') this.opt('isLeaf', true);				
			}
		}
	}
	
});

		
