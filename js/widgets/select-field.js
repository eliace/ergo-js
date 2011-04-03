

Dino.declare('Dino.widgets.SelectField', 'Dino.widgets.ComboField', {
	
	defaultOptions: {
		cls: 'dino-select-field',
    components: {
			input: {
				updateOnValueChange: true,
				format: function(val) { return (val === '' || val === undefined) ? '' : this.parent.dropdown.data.get(val); }
			},
      button: {
        dtype: 'icon-button',
        onAction: function() {
          
//          var dd = $.dino(this.parent.options.dropdown);
          var dd = this.parent.dropdown;
					$('body').append(dd.el); // <-- временное решение
//          dd.selectBox = this.parent;
//					this.parent.dropdownBox = dd;
										
          dd.el.width(this.parent.el.width());

					var offset = this.parent.el.offset();
          dd.show(offset.left, offset.top + this.parent.el.outerHeight());
//          dd.show(0, this.parent.el.outerHeight());
          
        }
      },
	    dropdown: {
	      dtype: 'dropdown-box',
//				renderTo: 'body',
	      cls: 'dino-border-all',
				style: {'display': 'none', 'line-height': 'normal'},
	      dynamic: true,
	      defaultItem: {
	        dtype: 'text-item',
	        style: {'display': 'block'},
					events: {
						'click': function(e, w) {
	          	w.parent.hide();
							w.parent.parent.input.setValue(w.data.id);
						}
					}
	      }
	    }

    }		
	}
	
	
}, 'select-field');
