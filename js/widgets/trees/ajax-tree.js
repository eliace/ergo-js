

//= require <widgets/trees/basic-tree>






Ergo.declare('Ergo.widgets.AjaxTree', 'Ergo.widgets.BasicTree', {
	
	defaults: {
		
		cls: 'e-ajax-tree',
		
		node: {
			
	    binding: function(v) {
	      this.opt('leaf', this.data.opt('leaf'));
	    },
	    
	    
	    set: {
	    	'leaf': function(v) {
					this.states.toggle('leaf', v);
	    	}
	    },
	    
			transitions: {
				
	      '> expanded': function() {

					var result = $.Deferred();

	        if(this.data._fetched) {
	          
	          this.subtree.show()
	          	.then(function(){ result.resolve(); });
	          
	        }
	        else {
	
	          this.content.opt('xicon', 'ajax-loader');
	          
	          var self = this;
	          
//	          var v = this.getValue();
	          
	          this.data.fetch(this.data.id()).then(function(){
	          	self.content.opt('xicon', false);
	          	self.subtree.show()
	          		.then(function(){ result.resolve(); });
	          });
	          
	        }
	        
	        return result;
	      }
				
			}
			
			
//			components: {
				// content: {
					// onClick: function() {
						// this.parent.states.toggle('expanded');
					// }
				// },
				// icon: {
					// style: {'display': 'inline-block'}
				// },
//				content: {
					// etype: 'text-item',
					// style: {'display': 'inline-block'},
					// binding: function(v) {
						// this.opt('text', v.title);
						// return false;
					// }							
				// }
				// subtree: {
					// hidden: true,
					// dataId: 'children',
					// dynamic: true,
					// mixins: ['effects'],
					// effects: {
						// show: 'slideDown',
						// hide: 'slideUp',
						// delay: 400
					// }
				// }
//			}
			
		}
		
		 
	}
	
	
	
	
	
}, 'ajax-tree');
