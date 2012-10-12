



Ergo.declare('Ergo.plugins.tree.NodeCollection', 'Ergo.data.AjaxCollection', {

	defaults: {
	},
	
	model: 'Ergo.plugins.tree.NodeModel',
	
	path: function() {
		return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	}
	
	
});


Ergo.declare('Ergo.plugins.tree.NodeModel', 'Ergo.data.Model', {
	
	defaults: {
	},
	
	fields: {
		'children': 'Ergo.plugins.tree.NodeCollection'
	},
	
	
	fetch: function(id) {
		
		var self = this;
		
		return $.getJSON(this.path()+'/'+id)
			.always(function(){
				self._fetched = true;
			}).success(function(json){
				self.set('children', json);
			});
	},
	
	path: function() {
		return (this.source instanceof Ergo.core.DataSource) ? this.source.path() : this.options.path;
	}
	
	
});





Ergo.declare('Ergo.plugins.tree.AjaxTree', 'Ergo.widgets.Tree', {
	
	defaults: {
		
		cls: 'e-ajax-tree',
		
		dynamic: true,
		
		node: {
			
	    binding: function(v) {
	      this.states.toggle('leaf', !v.children);      
	    },
	    
	    
			
			transitions: {
				
	      '> expanded': function() {

	        if(this.data._fetched) {
	          
	          this.subtree.show();
	          
	        }
	        else {
	
	          this.content.opt('xicon', 'e-icon-ajax-loader');
	          
	          var self = this;
	          
	          var v = this.getValue();
	          
	          this.data.fetch(v.id).then(function(){
	          	self.subtree.show();
	          });
	          
	        }
	      }
				
			},
			
			
			components: {
				// content: {
					// onClick: function() {
						// this.parent.states.toggle('expanded');
					// }
				// },
				icon: {
					style: {'display': 'inline-block'}
				},
				content: {
					etype: 'text-item',
					icon: 'e-icon-house',
					style: {'display': 'inline-block'},
					binding: function(v) {
						this.opt('text', v.title);
						this.opt('icon', 'e-icon-'+v.type);
						return false;
					}							
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
					}
				}
			}
			
		}
		
		 
	}
	
	
	
}, 'ajax-tree');
