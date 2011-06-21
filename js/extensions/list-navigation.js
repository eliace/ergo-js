
//= require "selectable"
//= require "focusable"


Dino.ListNavigation = function(o) {
	
	Dino.smart_override(o, {
		
//		extensions: [Dino.Selectable, Dino.Focusable],
		
		onKeyDown: function(e)	{
			
	    var catched = false;
	    var selected_row = this.selection.get();
	    if(selected_row) {
				
				var container = selected_row.parent;
	      
				if(e.keyCode == 38) {
	        var prev_row = container.items.get(selected_row.index-1);
	        if(prev_row) {
	          this.selection.add( prev_row );
	          var pos = prev_row.el.offset().top - this.el.offset().top;
	          if(pos < 0) {
	            this.el.scrollTop(this.el.scrollTop() - prev_row.el.outerHeight());
	          }
	//                console.log(Dino.format('%s, %s, %s', this.el.scrollTop(), this.parent.el.height(), offset));
	        }
	        catched = true;
	      }
	      if(e.keyCode == 40) {
	        var next_row = container.items.get(selected_row.index+1);
	        if(next_row) {
	          this.selection.add( next_row );
	          var pos = next_row.el.offset().top - this.el.offset().top;
	          if(this.el.height() - next_row.el.outerHeight() < pos) {
	            this.el.scrollTop(this.el.scrollTop() + next_row.el.outerHeight());
	          }
	//                console.log(Dino.format('%s, %s, %s', this.el.scrollTop(), this.parent.el.height(), next_row.el.position().top));                
	        }
	        catched = true;
	      }
				if(e.keyCode == 13) {
					var editable = false;
					selected_row.walk(function(){
						if(!editable && this.is(Dino.Editable)) {
							editable = this;
						}
					});
					
					if(editable)
						editable.startEdit();
					
				}
	    }              
	    
	    if(catched) e.baseEvent.preventDefault();
			
		}
		
		
		
	});	
	
};
