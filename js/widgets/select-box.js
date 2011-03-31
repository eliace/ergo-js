

Dino.declare('Dino.widgets.SelectBox', 'Dino.widgets.ComboField', {
	
	defaultOptions: {
		cls: 'dino-select-box',
    components: {
			input: {
				updateOnValueChange: true
			},
      button: {
        dtype: 'icon-button',
        onAction: function() {
          
          var dd = $.dino(this.parent.options.dropdownModel); //this.parent.dropdown;
          dd.selectBox = this.parent;
					
					var offset = this.parent.el.offset();
					
          dd.el.width(this.parent.el.width());
          dd.show(offset.left, offset.top + this.parent.el.outerHeight());
          
        }
      }
    },
    dropdownModel: {
			renderTo: 'body',
      dtype: 'dropdown-box',
      cls: 'dino-border-all',
      dynamic: true,
      defaultItem: {
        dtype: 'text-item',
        style: {'display': 'block'},
				events: {
					'click': function(e, w) {
          	w.parent.hide();
						w.parent.selectBox.setValue(w.getValue());
					}
				}
      }
    }		
	}
	
	
}, 'select-box');
