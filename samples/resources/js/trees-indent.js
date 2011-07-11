
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
    
    height: 'auto',
    
    isDynamic: true,
    
    treeModel: {
      node: {
        dtype: 'indent-tree-node',
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








