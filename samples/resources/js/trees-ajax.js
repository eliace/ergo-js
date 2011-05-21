
var treeData = new Dino.data.ArrayDataSource();  

$.getJSON('ajax/tree_node.json', {}, function(data){
  treeData.source[0] = data;
  treeData.events.fire('onValueChanged');
//  treeData.set(data);
});


  
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
          icon: 'silk-icon-folder',
          xicon: true,
          dataId: 'name'
        }        
      },
      binding: function(val) {
//        this.content.opt('icon', val.type);
        if(val.type == 'file') this.opt('isLeaf', true);        
      },
      onStateChange: function(e) {
        if(e.state == 'expanded' && e.op == 'set') {
          var val = this.data.val();
          var self = this;
          if(val.is_ref) {
//            this.content.opt('showRightIcon', true);
            this.content.rightIcon.states.set('dino-icon-loader');
            setTimeout(function(){
              $.getJSON('ajax/tree_node.json', {}, function(data){
                self.data.set('children', [data]);
                val.is_ref = false;
//                self.content.opt('showRightIcon', false);
                self.content.rightIcon.states.clear('dino-icon-loader');
              });              
            }, 400);
          }
        }
      }
    }
  }
  
});
    
    
