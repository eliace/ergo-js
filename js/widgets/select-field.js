

Dino.declare('Dino.widgets.SelectField', 'Dino.widgets.ComboField', {
	
	defaultOptions: {
		cls: 'dino-select-field',
    components: {
			input: {
				updateOnValueChange: true,
				readOnly: true,
				format: function(val) { 
					return (val === '' || val === undefined) ? '' : this.parent.dropdown.data.get(val); 
				}
			},
      button: {
        dtype: 'icon-button',
        onAction: function() {
					this.parent.showDropdown();
        }
      },
	    dropdown: {
	      dtype: 'dropdown-box',
				renderTo: 'body',
	      cls: 'dino-border-all dino-dropdown-shadow',
				style: {'display': 'none'},
				content: {
					dtype: 'list-box',
					defaultItem: {
						events: {
							'click': function(e, w) {
								var dd = w.parent.parent;
								dd.parent.setValue(w.data.id);
		          	dd.hide();
							}
						}						
					}
				}
	    }

    },
		dropdownOnClick: false,
		dropdownOnFocus: false
	},
	
	
	
	$init: function(o) {
		Dino.widgets.SelectField.superclass.$init.apply(this, arguments);
		
		var self = this;
		
		if(o.dropdownOnClick) {
			this.el.click(function(){	self.showDropdown(); });
		}
		if(o.dropdownOnFocus) {
			this.el.focus(function(){	self.showDropdown(); });
		}
	},
	
	
	showDropdown: function() {
    var dd = this.dropdown;
							
    dd.el.css('min-width', this.el.width());//.width(this.el.width());

		var offset = this.el.offset();
    dd.show(offset.left, offset.top + this.el.outerHeight());	
	}
	
	
}, 'select-field');
