

//= require <widgets/trees/basic-tree>




Ergo.declare('Ergo.widgets.DynamicTree', 'Ergo.widgets.Tree', {
	
	defaults: {
		
		cls: 'e-dynamic-tree',
		
		
		dynamic: true,
		

		node: {
			
			components: {
				content: {
					etype: 'text-item'
				},
				subtree: {
					hidden: true,
					dataId: 'children',
					dynamic: true,
					mixins: ['effects'],
					effects: {
						show: 'slideDown',
						hide: 'slideUp',
						delay: 400
					},
					
					onBound: function(e) {
						
						var self = this;
						
						this.data.reg('entry:added', function(e){
							if(self.states.is('expanded') && self.data.size() == 1)
								self.show();
						});
						
					}
					
					
				}
			},
			
						
	    binding: function(v) {
	      this.opt('leaf', this.data.opt('leaf'));
	    },
	    
	    
			transitions: {
				
	      '* > expanded': function() {
					
					var result = $.Deferred();

	        if(this.data._fetched) {
	          
	          result = this.subtree.show();
//	          	.then(function(){ result.resolve(); });
	          
	        }
	        else {
	
	          this.content.opt('xicon', 'ajax-loader');
	          
	          var self = this;
	          
//	          var v = this.opt('value');
	          
	          this.data.fetch().then(function(){
	          	self.content.opt('xicon', false);
	          	self.subtree.show()
	          		.then(function(){ result.resolve(); });
	          });
	          
	        }
	        
	        return result;
	      }
				
			}
			
			
		}
		
		 
	}
	
	
	
	
	
}, 'dynamic-tree');
