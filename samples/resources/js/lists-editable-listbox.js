
var listData = ['Alice', 'Bob', 'Charlie', 'Denver', 'Eva', 'Fox', 'George', 'Harry', 'Ian', 'Jack', 'Kevin'];




var list_snippet = {
	dtype: 'list-view',
	style: {'background-color': '#fff'},
	height: 'auto',
	dynamic: true,
	extensions: [Dino.Selectable, Dino.Focusable, Dino.ListNavigation],
  defaultItem: {
    icon: 'silk-icon-user-gray',
		content: {
			extensions: [Dino.Editable],
			editor: {
				dtype: 'text-editor',
				width: 150
			},
		},
		onDoubleClick: function() {
			this.content.startEdit();
		},
		onClick: function(){
			this.parent.selection.set(this);
		}		
  },
	
/*	
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
				
//				var event = new Dino.events.CancelEvent({target: selected_row});
//				this.events.fire('onStartEdit', event);
//				if(!event.isCanceled) {
//					selected_row.startEdit();
//				}
//				selected_row.content.startEdit();
			}
    }              
    
    if(catched) e.baseEvent.preventDefault();
		
	}
*/	
};



    
var panel1 = $.dino({
  dtype: 'editable-panel',
	title: 'Редактируемый список',
  renderTo: '.preview',
  width: 400,
  height: 240,
	cls: 'dino-border-all',
	
	data: listData,
	
	components: {
		header: {
			state: 'hidden'
		},
		toolbar: {
			cls: 'dino-border-bottom',
			defaultItem: {
				cls: 'plain'
			}
		}
	},
	
	content: list_snippet,
	
	toolbarButtons: ['add', 'delete', 'save', 'refresh'],
	
	toolbarButtonSet: {
		'add': {icon: 'silk-icon-add'},
		'delete': {icon: 'silk-icon-delete'},
		'refresh': {icon: 'silk-icon-arrow-refresh'},
		'save': {icon: 'silk-icon-disk'},
	}
	
//  editOnDblClick: true
});  
    

		
var panel2 = $.dino({
  dtype: 'editable-panel',
	title: 'Редактируемый список',
  renderTo: '.preview',
  width: 400,
  height: 240,
	cls: 'dino-border-all',
	
	style: {'margin-top': 20},
	
	data: listData,
	
	components: {
		header: {
			state: 'hidden'
		},
		toolbar: {
			weight: 30,
			cls: 'dino-border-top',
			defaultItem: {
				dtype: 'icon-button'
			}
		}
	},
	
	content: list_snippet,
	
	toolbarButtons: ['add', 'delete', 'save', 'refresh'],
	
	toolbarButtonSet: {
		'add': {icon: 'silk-icon-add'},
		'delete': {icon: 'silk-icon-delete'},
		'refresh': {icon: 'silk-icon-arrow-refresh'},
		'save': {icon: 'silk-icon-disk'},
	}
	
//  editOnDblClick: true
});  
		
		
		