

AjaxNode = Ergo.data.Model.extend({
		
	fields: {
		'children': 'AjaxNodeList'
	}	
	
});


AjaxNodeList = Ergo.data.Collection.extend({
	
	defaults: {
		itemModel: 'AjaxNode'
	},
	
	fetch: function(id) {

		var self = this;
		var deferred = $.Deferred().always(function(){self._fetched = true;});
//		var deferred = new Ergo.core.Deferred().then(function(){self._fetched = true});		

		if(!id)
			return deferred.resolve();
		
//		growl.info('ajax/tree/'+id+'.json');
		
		$.getJSON('ajax/tree/'+id+'.json', function(json){
			self.set(json);
			deferred.resolve();
		});
		
		return deferred;
	}	
		
});





var treeData = new AjaxNodeList([]);  

//$.getJSON('ajax/tree_node.json', {}, function(data){
//  treeData.source[0] = data;
//  treeData.events.fire('onValueChanged');
////  treeData.set(data);
//});


  
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
						this.content.text.opt('xicon', 'dino-icon-loader');
						
						e.cancel();
						
						subtree.fetch(this.data.oid()).then(function(){
							self.content.text.opt('xicon', false);
							self.states.set('expand-collapse');
						});
					}
					
				}				
			}
			
			
			
//      onStateChange: function(e) {
//        if(e.state == 'expanded' && e.op == 'set') {
//					
//					
//					
//					
//          var val = this.data.get();
//          var self = this;
//          if(val.is_ref) {
////            this.content.opt('showRightIcon', true);
//            this.content.text.rightIcon.states.set('dino-icon-loader');
//            setTimeout(function(){
//              $.getJSON('ajax/tree_node.json', {}, function(data){
//                self.data.set('children', [data]);
//                val.is_ref = false;
////                self.content.opt('showRightIcon', false);
//                self.content.text.rightIcon.states.clear('dino-icon-loader');
//              });              
//            }, 400);
//          }
//        }
//      }
    }
  }
  
});
    
 
treeData.fetch(1); 
    
