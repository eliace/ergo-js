

AjaxNode = Ergo.data.Model.extend({
    
  fields: {
    children: 'AjaxNodeList'
  }  
  
});


AjaxNodeList = Ergo.data.Collection.extend({
  
  model: 'AjaxNode',
  
  fetch: function(id) {

    var self = this;
    var deferred = $.Deferred().always(function(){self._fetched = true;});
//    var deferred = new Ergo.core.Deferred().then(function(){self._fetched = true});    

    if(!id)
      return deferred.resolve();
    
//    growl.info('ajax/tree/'+id+'.json');
    
    $.getJSON('ajax/tree/'+id+'.json', function(json){
    	setTimeout(function(){
	      self.set(json);
	      deferred.resolve();    		
    	}, 600);
    });
    
    return deferred;
  }  
    
});





var treeData = new AjaxNodeList([]);  


  
$.ergo({
  etype: 'tree',
  renderTo: '.preview',
  cls: 'dynamic-tree',
  
  data: treeData,
  
  isDynamic: true,
  
  treeModel: {
    node: {
      cls: 'dynamic-tree-node',
      content: {
        components: {
          text: {
            icon: 'silk-icon-folder',
            xicon: true,
            dataId: 'name'
          }        
        }        
      },
      binding: function(val) {
//        this.content.opt('icon', val.type);
        if(val.type == 'file') this.opt('isLeaf', true);        
      },
      
      onBeforeStateChange: function(e) {
        if (e.state == 'expand-collapse' && e.op == 'set') {
          
          var self = this;
          
          var subtree = this.data.entry('children');
          
          if(!this.options.isLeaf && !subtree._fetched) {
            this.content.text.opt('icon', 'e-icon-loader');
            
            e.cancel();
            
            subtree.fetch(this.data.oid()).then(function(){
              self.content.text.opt('icon', 'silk-icon-folder');
              self.states.set('expand-collapse');
            });
          }
          
        }        
      }
      
      
      
    }
  }
  
});
    
 
treeData.fetch(1); 
    
