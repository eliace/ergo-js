
var treeData = new Ergo.core.DataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });
  
  
$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  title: 'List tree',

  cls: 'dino-border-all',

  width: 400,
  height: 300,
  
  content: {
    etype: 'tree',
    cls: 'tree-list dino-text-content',
    
    data: treeData,
    
    height: 'auto',
    
    isDynamic: true,
    
    treeModel: {
      node: {
        etype: 'indent-tree-node',
        content: {
          components: {
            text: {
              icon: true,
              dataId: 'name'            
            }
          }          
        },
        binding: function(val) {
          this.content.text.opt('icon', 'silk-icon-'+val.type);
          if(val.type != 'folder' && val.type != 'drive') this.opt('isLeaf', true);
        }
        
      }
    }    
  }
  
});








